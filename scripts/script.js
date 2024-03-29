const expression = document.querySelector(".expression");
const expressionDisplay = document.querySelector(".expressionDisplay");
const buttons = document.querySelectorAll(".gridButtons button");
const buttonlHistory = document.querySelector(".buttonHistory");
const modalHistory = document.querySelector(".modalHistory");
const buttonCloseModal = document.querySelector(".buttonCloseModal");
const containerHistory = document.querySelector(".containerHistory");
const buttonClearHistory = document.querySelector(".buttonClearHistory");

buttonlHistory.addEventListener("click", () => {
  modalHistory.showModal();
  updateHistory();
});

buttonCloseModal.addEventListener("click", () => {
  modalHistory.close();
});

buttonClearHistory.addEventListener("click", () => {
  const calculatorHistory = JSON.parse(
    localStorage.getItem("@calculator:history")
  );

  if (calculatorHistory) {
    const responseToClear = confirm("Deseja limpar o histórico?");
    if (responseToClear) {
      localStorage.removeItem("@calculator:history");
      updateHistory();
    }
  }
});

function clearScreen() {
  expression.innerHTML = "";
  expressionDisplay.innerHTML = "";
}

function updateHistory() {
  const calculatorHistory = JSON.parse(
    localStorage.getItem("@calculator:history")
  );
  containerHistory.innerHTML = "";
  if (calculatorHistory) {
    calculatorHistory.reverse().forEach((value) => {
      containerHistory.innerHTML += `
      <div class="boxHistory">
        <div class="expressionHistory">${value.expression}</div>
        <div class="resultHistory">${value.result}</div>
      </div>
      `;
    });
  } else {
    console.log(calculatorHistory);
    containerHistory.innerHTML = `<div class="emptyHistory">Vazio</div>`;
  }
}

const totalNumbers = 13;
let isError = false;

buttons.forEach((button) => {
  button.addEventListener("click", () => {
    if (isError) {
      clearScreen();
      isError = false;
    }
    switch (button.innerHTML) {
      case "C":
        clearScreen();
        break;
      case "DEL":
        expression.innerHTML = expression.innerHTML.slice(0, -1);
        break;
      case "=":
        try {
          if (expression.innerHTML.length > 0) {
            expressionDisplay.innerHTML = expression.innerHTML;
            expression.innerHTML = String(
              eval(expression.innerHTML.replace("x", "*").replace("%", "/100"))
            ).slice(0, totalNumbers);
          }

          const calculatorHistory = JSON.parse(
            localStorage.getItem("@calculator:history")
          );

          if (calculatorHistory) {
            localStorage.setItem(
              "@calculator:history",
              JSON.stringify([
                ...calculatorHistory.slice(-20), //limit history
                {
                  result: expression.innerHTML,
                  expression: expressionDisplay.innerHTML,
                },
              ])
            );
          } else {
            localStorage.setItem(
              "@calculator:history",
              JSON.stringify([
                {
                  result: expression.innerHTML,
                  expression: expressionDisplay.innerHTML,
                },
              ])
            );
          }
        } catch (error) {
          console.error(error);
          expression.innerHTML = "Error";
          isError = true;
        }
        break;
      default:
        if (expression.innerHTML.length >= totalNumbers) return;
        expression.innerHTML += button.innerHTML;
        break;
    }
  });
});
