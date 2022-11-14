const screen = document.querySelector(".screen");
let operand1;
let operand2;
let operation = null;
let displayValue = 0;
let pointActive = false;
let operationActive = false;
let operationResult;
let clearActive = true;

document.querySelector("html").addEventListener('load', initialiseButtons());

function add(number1, number2) {
    return +number1 + +number2;
}

function subtract(number1, number2) {
    return +number1 - +number2;
}

function multiply(number1, number2) {
    return +number1 * +number2;
}

function divide(number1, number2) {
    return +number1 / +number2;
}

function operate(operator, number1, number2) {
    if(operator === "+") {
        return add(number1, number2);
    } else if(operator === "-") {
        return subtract(number1, number2);
    } else if(operator === "*") {
        return multiply(number1, number2);
    } else if(operator === "/") {
        return divide(number1, number2);
    }
}

// Display number on screen
function display(value) {
    if(value == "." && !pointActive) {
        pointActive = true;
        screen.innerText += value;
    } else if(clearActive) {
        screen.innerText = value;
        clearActive = false;
    } else if(pointActive || !operationActive) {
        screen.innerText += value;
    } else {
        screen.innerText += value;
    }
}

// Add event listener to each button to function when pressed
function initialiseButtons() {
    const buttons = document.querySelectorAll(".buttons button[data-number]");
    const buttonsValue = Array.from(buttons);
    buttonsValue.forEach(button => button.addEventListener('click', () => display(button.dataset.number)));
    
    const point = document.querySelector("#point");
    point.addEventListener("click", () => {
        display(point.textContent);
        point.disabled = true;
    });

    const operator = document.querySelectorAll(".buttons button[data-op]");
    const operatorButton = Array.from(operator);
    operatorButton.forEach(op => op.addEventListener("click", () => {
        operationActive = true;
        clearActive = true;
        if(operation !== null) {
            operand2 = screen.textContent;
            display(operate(operation, operand1, operand2));
            operation = null;
            clearActive = true;
        }

        operand1 = screen.textContent;
        operation = op.dataset.op
        point.disabled = false;
    }));

    const equalButton = document.querySelector("#equals");
    equalButton.addEventListener("click", () => {
        operand2 = screen.textContent;
        clearActive = true;
        display(operate(operation, operand1, operand2));
        operationActive = false;
        operation = null;
        point.disabled = false;
    })

    const clearButton = document.querySelector(".clear");
    clearButton.addEventListener("click", clear);
}

function clear() {
    operand1 = null;
    operand2 = null;
    screen.innerText = "0";
    operation = null;
    pointActive = false;
    operationActive = false;
    clearActive = true;
    point.disabled = true;
}