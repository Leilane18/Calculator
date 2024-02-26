const expression = document.querySelector(".expression");
const expressionDisplay = document.querySelector(".expressionDisplay");
const buttons = document.querySelectorAll(".gridButtons button");
const buttonlHistory = document.querySelector(".buttonHistory");
const modalHistory = document.querySelector(".modalHistory");
const buttonCloseModal = document.querySelector(".buttonCloseModal");

modalHistory.showModal();

buttonlHistory.addEventListener("click", () => {
  modalHistory.showModal();
});

buttonCloseModal.addEventListener("click", () => {
  modalHistory.close();
});

function clearScreen() {
  expression.innerHTML = "";
  expressionDisplay.innerHTML = "";
};

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
