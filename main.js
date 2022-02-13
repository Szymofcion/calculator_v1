const numbers = document.querySelectorAll(".number");
const operators = document.querySelectorAll(".operator");
const clear = document.querySelector(".clear");
const remove = document.querySelector(".remove");
const sum = document.querySelector(".sum");
const resultCurrent = document.querySelector(".current-action");
const resultPrevious = document.querySelector(".previous-action");

let currentAction = "";
let previousAction = "";
let operation = undefined;

const calculate = () => {
  let action;

  const previous = parseFloat(previousAction);
  const current = parseFloat(currentAction);

  if (isNaN(previous) || isNaN(current)) {
    return;
  }
  switch (operation) {
    case "+":
      action = previous + current;
      break;
    case "-":
      action = previous - current;
      break;
    case "×":
      action = previous * current;
      break;
    case "÷":
      if (current === 0) {
        alert("Pamiętaj cholero, nie dziel przez zero!");
        deleteResult();
        return;
      }
      action = previous / current;
      break;
    case "√":
      action = Math.pow(previous, 1 / current);
      break;
    case "%":
      action = (previous / 100) * current;
      break;
    case "^":
      action = Math.pow(previous, current);
      break;
    case "log":
      action = Math.log(previous) / Math.log(current);
      break;
    default:
      return;
  }
  currentAction = action;
  operation = undefined;
  previousAction = "";
};

const selectAction = (operator) => {
  if (currentAction === "") {
    return;
  }
  if (previousAction !== "") {
    const previous = resultPrevious.innerText;
    if (
      currentAction.toString() === "0" &&
      previous[previous.length - 1] === "÷"
    ) {
      deleteResult();
      return;
    }
    calculate();
  }
  operation = operator;
  previousAction = currentAction;
  currentAction = "";
};

const updateResult = () => {
  resultCurrent.innerText = currentAction;
  if (operation != null) {
    resultPrevious.innerText = previousAction + operation;
  } else {
    resultPrevious.innerText = "";
  }
};

const addNumber = (number) => {
  if (number === ",") {
    if (currentAction.includes(",")) {
      return;
    }
  }
  currentAction = currentAction.toString() + number.toString();
};

const deleteNumber = () => {
  currentAction = currentAction.toString().slice(0, -1);
};

const deleteResult = () => {
  currentAction = "";
  previousAction = "";
  loperation = undefined;
};

numbers.forEach((number) => {
  number.addEventListener("click", () => {
    addNumber(number.innerText);
    updateResult();
  });
});

remove.addEventListener("click", () => {
  deleteNumber();
  updateResult();
});

operators.forEach((operator) => {
  operator.addEventListener("click", () => {
    selectAction(operator.innerText);
    updateResult();
  });
});

sum.addEventListener("click", () => {
  calculate();
  updateResult();
});

clear.addEventListener("click", () => {
  deleteResult();
  updateResult();
});
