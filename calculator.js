/**
 * @fileoverview calculator.js is a file containing javascript code for an on
 * -screen calculator capable of arithmetic operations.
 */

const allClearButton = document.querySelector(".all-clear");
const numberButtons = document.querySelectorAll(".number");
const operationButtons = document.querySelectorAll(".operation");
const deleteButton = document.querySelector(".delete");
const equalsButton = document.querySelector(".equals")
const calculatorDisplay = document.querySelector(".calculator-display");

/**
 * A calculator that contains functions for: computing arithmetic operaitons,
 * updating & clearing the display, and resetting the calculator to default.
 *
 */
class Calculator {
  constructor() {
    this.current = "";
    this.previous = "";
    this.operation = "";
    this.display = calculatorDisplay.innerText;
  }

  /**
   * Appends a number to the calculator display.
   */
  appendNumber(number) {
    if (number == '.' && calculatorDisplay.innerText.includes(".")) {
      return;
    }
    if (calculatorDisplay.innerText.includes(".") &&
        calculatorDisplay.innerText.length < 10) {
      calculatorDisplay.innerText = calculatorDisplay.innerText + number;
    }
    else if (calculatorDisplay.innerText.length < 9) {
      calculatorDisplay.innerText = calculatorDisplay.innerText + number;
    }
  }

  /**
   * Resets the calculator to the default values and clears the display.
   */
  allClear() {
    calculatorDisplay.innerText = "";
    this.current = "";
    this.previous = "";
    this.operation = "";
  }

  /**
   * Computes a number using the previous display number, arithmetic operation,
   * and current number input by the user.
   *
   * @return {string} Solution to the computation.
   */
  compute() {
    let solution;
    if (this.operation === "" || this.current ===  "" || this.previous === "") {
      if (isNaN(parseFloat(this.getDisplayValue()))) {
        return "";
      }
      return parseFloat(this.getDisplayValue());
    }

    switch(this.operation) {
      case '+' :
        solution = parseFloat(this.previous)+parseFloat(this.current);
        break;

      case '-' :
        solution = parseFloat(this.previous)-parseFloat(this.current);
        break;

      case '×' :
        solution = parseFloat(this.previous)*parseFloat(this.current);
        break;

      case '÷' :
        if (this.current === "0") {
          return "Undefined";
        }
        solution = parseFloat(this.previous)/parseFloat(this.current);
        break;
      }

      if (solution.toString().includes(".") &&
          solution.toString().length > 10) {
        solution = this.round(solution,8);
      }
      else if (solution.toString().length > 9) {
        return "Error";
      }
      return solution.toString();
  }

  /**
   * Gets the value currently displayed on the calculator.
   *
   * @return {string} Value currently displayed.
   */
  getDisplayValue() {
    return calculatorDisplay.innerText;
  }

  /**
   * Returns the number currently displayed on the calculator.
   *
   * @param {string} Number currently displayed.
   */
  setDisplayValue(number) {
    calculatorDisplay.innerText = number;
  }

  /**
   * Deletes the number currently displayed on the calculator.
   */
  delete() {
    if (calculator.getDisplayValue() == this.current) {
      this.current = "";
      calculatorDisplay.innerText = "";
    }
    if (calculator.getDisplayValue() == this.previous && this.operation != "") {
      this.previous = "";
      calculatorDisplay.innerText = "";
    }
  }

  /**
   * Sets the current operand.
   */
  setCurrent(current) {
    this.current = current;
  }

  /**
   * Sets the previous operand.
   */
  setPrevious(previous) {
    this.previous = previous;
  }

  /**
   * Sets the arithmetic operation.
   */
  setOperation(operation) {
    this.operation = operation;
  }

  /**
   * Gets the current operand.
   */
  getCurrent() {
    return this.current;
  }

  /**
   * Gets the previous operand.
   */
  getPrevious() {
    return this.previous;
  }

  /**
   * Gets the most recent operation.
   */
  getOperation() {
    return this.operation;
  }

  /**
   * Rounds a number.
   *
   * @param {string} number number being rounded.
   * @param {string} decimals number of decimals.
   * @return {string} The number rounded.
   */
  round(number, decimals) {
    return Number(Math.round(number+'e'+decimals)+'e-'+decimals);
  }
}

const calculator = new Calculator();

numberButtons.forEach((button) => {
  button.addEventListener('click', function(e) {
    if (calculator.getPrevious() !== "" && calculator.getCurrent() === "") {
      calculator.setDisplayValue(calculator.getCurrent() +
          e.currentTarget.innerText);
    }
    else {
      calculator.appendNumber(e.currentTarget.innerText);
    }
    calculator.setCurrent(calculator.getDisplayValue());
    });
});

operationButtons.forEach((button) => {
  button.addEventListener('click', function(e) {
    if (calculator.getCurrent() === "" && calculator.getPrevious() === "") {
      return;
    }
    if (calculator.getCurrent() !== "" && calculator.getPrevious() !== "") {
      calculator.setDisplayValue(calculator.compute());
      calculator.setOperation(e.currentTarget.innerText);
      calculator.setPrevious(calculator.getDisplayValue());
      calculator.setCurrent("");
    }
    else if (calculator.getOperation() !== "" &&
        calculator.getCurrent() === "") {
      calculator.setOperation(e.currentTarget.innerText);
    }
    else {
      calculator.setOperation(e.currentTarget.innerText);
      calculator.setPrevious(calculator.getCurrent());
      calculator.setCurrent("");
    }
  });
});

equalsButton.addEventListener('click', function(e) {
  if (calculator.getCurrent() === "" & calculator.getPrevious() !== "" &
      calculator.getOperation() !== "") {
    calculator.setCurrent(calculator.getPrevious());
    calculator.setDisplayValue(calculator.compute());
  }
  else {
    calculator.setDisplayValue(calculator.compute());
  }
})

allClearButton.addEventListener('click', function(e) {
  calculator.allClear();
});

deleteButton.addEventListener('click', function(e) {
  calculator.delete();
});
