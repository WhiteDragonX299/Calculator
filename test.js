import { Decimal } from 'decimal.js';
// Define element
const answer = document.getElementById("answer");
let firstInput = "";
let secondInput = "";
let currentOperator = "";
const numbers = document.querySelectorAll(".numbers");
const operators = document.querySelectorAll(".operator");
const clear = document.getElementById("clear-all");
const PosNegChange = document.getElementById("postitive-negative-change");
const percentage = document.getElementById("percent")
const equal = document.getElementById("equals");
const demincial = document.getElementById("dots");

// Function to handle number input with decimal
function handleNumberInput(input) {
  if (input === "." && firstInput.includes(".") && currentOperator === "") {
    // Prevent adding more than one decimal point to firstInput
    return;
  } else if (input === "." && secondInput.includes(".") && currentOperator !== "") {
    // Prevent adding more than one decimal point to secondInput
    return;
  }

  if (currentOperator === "") {
    firstInput += input;
    answer.innerHTML = firstInput;
  } else {
    secondInput += input;
    answer.innerHTML = secondInput;
  }
}


// Perform calculation
function calculate() {
  const num1 = new Decimal(firstInput);
  const num2 = new Decimal(secondInput);
  let result;

  switch (currentOperator) {
    case "+":
      result = num1.plus(num2);
      break;
    case "-":
      result = num1.minus(num2);
      break;
    case "*":
      result = num1.times(num2);
      break;
    case "/":
      result = num1.div(num2);
      break;
    default:
      result = new Decimal(0); // Default case to handle unexpected operators
  }
  result = result.toPrecision(10);

  answer.innerHTML = result.toString();
  firstInput = result.toString();
  secondInput = "";
  currentOperator = "";
}

// Event listener for operators
operators.forEach(operator => {
  operator.addEventListener("click", (e) => {
    if (firstInput !== "" && secondInput === "") {
      currentOperator = e.target.getAttribute("value");
    } else if (firstInput !== "" && secondInput !== "") {
      calculate();
      currentOperator = e.target.getAttribute("value");
    }
  });
});

//Event listener for clearing answer
clear.addEventListener("click", () => {
	firstInput = "";
	secondInput = "";
	currentOperator = "";
	answer.innerHTML = "0";
});

//Event listener for changing the answer between positive and negative
PosNegChange.addEventListener("click", () => {
	let result = Number(answer.innerHTML);
	result *=-1;
	answer.innerHTML = result.toString();
})

//Event listener for changing the answer to percentage
percentage.addEventListener("click", () => {
	let result = Number(answer.innerHTML);
	result /= 100;
	answer.innerHTML = result.toString();
})

//Event listener for adding demincial
demincial.addEventListener("click", () => {
	handleNumberInput(".");
});

// Event listener for equals button
document.getElementById("equals").addEventListener("click", calculate);
