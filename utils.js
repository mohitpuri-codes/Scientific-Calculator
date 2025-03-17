import { ERROR, ERROR_INPUT } from "./constants.js";
import { addToHistory } from "./history.js";
import { getDegree } from "./degreeFunctionExponent.js";
import {
  updateDisplay,
  getDisplayStr,
  setDisplayStr,
  setInputStr,
  getInputStr,
  setAndAddDisplayStr,
  setAndAddInputStr,
} from "./script.js";

let isSecondFunction = false;

/**
 * Evaluates the mathematical expression in the input field and updates the display.
 */
export function equals() {
  let inputStr = getInputStr();
  let displayStr = getDisplayStr();
  try {
    if (inputStr === ERROR_INPUT || inputStr === ERROR) {
      return;
    }
    if (inputStr === "") return;
    // sanitize the leading zeros
    inputStr = inputStr.replace(/\b0+(\d+)/g, "$1");
    let result = eval(inputStr);
    result = parseFloat(result.toFixed(3));
    addToHistory(displayStr, result);
    setInputStr(result.toString());
    setDisplayStr(getInputStr());
  } catch (error) {
    setInputStr(ERROR);
    setDisplayStr(ERROR);
  }

  updateDisplay();
}

/**
 * Clears the calculator display and input fields.
 */
export function clearCalc() {
  setInputStr("");
  setDisplayStr("");
  updateDisplay();
}

/**
 * Removes the last character from the input and display strings.
 */
export function backspace() {
  let inputStr = getInputStr();
  let displayStr = getDisplayStr();
  if (inputStr.endsWith("**")) {
    setInputStr(inputStr.slice(0, -2));
    setDisplayStr(displayStr.slice(0, -1));
  } else if (inputStr.endsWith("**2") || inputStr.endsWith("**3")) {
    setInputStr(inputStr.slice(0, -3));
    setDisplayStr(displayStr.slice(0, -1));
  } else {
    setInputStr(inputStr.slice(0, -1));
    setDisplayStr(displayStr.slice(0, -1));
  }
  updateDisplay();
}

/**
 * Handles the square root or cube root calculation based on the function mode.
 */
export function squareRoot() {
  if (isSecondFunction) {
    setAndAddInputStr("Math.cbrt(");
    setAndAddDisplayStr("∛(");
  } else {
    setAndAddInputStr("Math.sqrt(");
    setAndAddDisplayStr("√(");
  }
  updateDisplay();
}

// Trigonometric functions

/**
 * Handles sine function calculation with degree or radian mode.
 */
export function sine() {
  let isDegree = getDegree();
  let checkDegree = isDegree ? "Math.sin((Math.PI/180)*" : "Math.sin(";
  setAndAddInputStr(checkDegree);
  setAndAddDisplayStr("sin(");
  updateDisplay();
}

/**
 * Handles cosine function calculation with degree or radian mode.
 */
export function cosine() {
  let isDegree = getDegree();
  let checkDegree = isDegree ? "Math.cos((Math.PI/180)*" : "Math.cos(";
  setAndAddInputStr(checkDegree);
  setAndAddDisplayStr("cos(");
  updateDisplay();
}

/**
 * Handles tangent function calculation with degree or radian mode.
 */
export function tangent() {
  let isDegree = getDegree();
  let checkDegree = isDegree ? "Math.tan((Math.PI/180)*" : "Math.tan(";
  setAndAddInputStr(checkDegree);
  setAndAddDisplayStr("tan(");
  updateDisplay();
}

/**
 * Handles the floor function calculations to evaluate the number to its floor value.
 */
export function floorValue() {
  setAndAddInputStr("Math.floor(");
  setAndAddDisplayStr("floor(");
  updateDisplay();
}

/**
 * Handles the ceil function calculations to evaluate the number to its ceil value.
 */
export function ceilValue() {
  setAndAddInputStr("Math.ceil(");
  setAndAddDisplayStr("ceil(");
  updateDisplay();
}

/**
 * Handles natural logarithm (ln) function to evaluate the input string.
 */
export function logarithm() {
  setAndAddInputStr("Math.log(");
  setAndAddDisplayStr("log(");
  updateDisplay();
}

/**
 * Handles log-base10 function to evaluate the input string.
 */
export function naturalLogarithm() {
  setAndAddInputStr("Math.log10(");
  setAndAddDisplayStr("ln(");
  updateDisplay();
}

/**
 * Handles absolute value calculation of the input string.
 */
export function absoluteValue() {
  setAndAddInputStr("Math.abs(");
  setAndAddDisplayStr("abs(");
  updateDisplay();
}

/**
 * Handles square value calculation of the input string.
 */
export function square() {
  // Remove previous exponent if backspaced
  let inputStr = getInputStr();
  let displayStr = getDisplayStr();
  setInputStr(inputStr.replace(/\*\*3$|\*\*2$/, ""));
  setDisplayStr(displayStr.replace(/[²³]$/, ""));

  if (inputStr === "" || /[*+\-/^]$/.test(inputStr)) return;

  // if 2nd is clicked then change the inputStr with cube root
  if (isSecondFunction) {
    setAndAddInputStr("**3");
    setAndAddDisplayStr("³");
  } else {
    setAndAddInputStr("**2");
    setAndAddDisplayStr("²");
  }

  updateDisplay();
}

/**
 * Handles value calculation of the input string to the power of 10.
 */
export function powerOfTen() {
  let inputStr = getInputStr();
  if (inputStr === "" || /[\+\-\*\/\(]$/.test(inputStr)) {
    setAndAddInputStr("10**");
    setAndAddDisplayStr("10^");
  } else {
    setAndAddInputStr("*10**");
    setAndAddDisplayStr("*10^");
  }
  updateDisplay();
}

/**
 * Handles absolute value calculation of the input string to the power of next input string.
 */
export function xToPowerY() {
  let inputStr = getInputStr();
  if (!inputStr.endsWith("**")) {
    setAndAddInputStr("**");
    setAndAddDisplayStr("^");
    updateDisplay();
  }
}

/**
 * Handles constant pie value calculation.
 */
export function pie() {
  let inputStr = getInputStr();
  if (inputStr && !isNaN(inputStr[inputStr.length - 1])) {
    setAndAddInputStr("*Math.PI");
    setAndAddDisplayStr("*π");
  } else {
    setAndAddInputStr("Math.PI");
    setAndAddDisplayStr("π");
  }
  updateDisplay();
}

/**
 * Handles inverse value of the current number in the input string.
 */
export function inverseValue() {
  let inputStr = getInputStr();
  if (typeof inputStr !== "string") setInputStr(inputStr.toString());
  let match = inputStr.match(/(\d+(\.\d+)?)$/);
  if (match) {
    let num = Number(match[1]);
    let inverse = `1/(${num})`;
    let replacedInputStr = inputStr.replace(/(\d+(\.\d+)?)$/, inverse);
    setInputStr(replacedInputStr);
    setDisplayStr(getInputStr());
  }
  updateDisplay();
}

/**
 * Handles Euler's number constant into the input string.
 */
export function exponent() {
  let inputStr = getInputStr();
  if (inputStr && !isNaN(inputStr[inputStr.length - 1])) {
    setAndAddInputStr("*Math.E");
    setAndAddDisplayStr("*e");
  } else {
    setAndAddInputStr("Math.E");
    setAndAddDisplayStr("e");
  }
  updateDisplay();
}

/**
 * Calculates the factorial of a given number.
 * @param {number} n - The number to compute factorial for.
 * @returns {number} - The computed factorial value.
 */
export function factorial(n) {
  if (n === 0 || n === 1) return 1;
  let result = 1;
  for (let i = 2; i <= n; i++) {
    result *= i;
  }
  return result;
}

/**
 * Handles factorial operation for the last entered number.
 */
export function factorialHandler() {
  let inputStr = getInputStr();
  if (inputStr === "" || isNaN(inputStr[inputStr.length - 1])) return;

  let num = "";
  let i = inputStr.length - 1;

  while (i >= 0 && !isNaN(inputStr[i])) {
    num = inputStr[i] + num;
    i--;
  }

  if (num !== "") {
    let factValue = factorial(Number(num));

    // Update inputStr to store function call for later evaluation
    let newInputStr = inputStr.slice(0, i + 1) + factValue;
    setInputStr(newInputStr);
    setAndAddDisplayStr("!");
  }

  updateDisplay();
}

/**
 * Toggles the sign (+/-) of the last number in the input string.
 */
export function toggleSign() {
  let inputStr = getInputStr();
  if (inputStr === "") setInputStr("0");
  if (typeof inputStr !== "string") setInputStr(inputStr.toString());

  let match = inputStr.match(/(-?\d+(\.\d+)?)$/);
  if (match) {
    let num = Number(match[1]);
    let toggled = num * -1;
    let newInputStr = inputStr.replace(/(-?\d+(\.\d+)?)$/, `${toggled}`);
    setInputStr(newInputStr);
    setDisplayStr(getInputStr());
  }
  updateDisplay();
}

/**
 * Toggles between normal and secondary function modes.
 */
export function changeMode() {
  isSecondFunction = !isSecondFunction;

  document.querySelector("[value='square']").textContent = isSecondFunction
    ? "x³"
    : "x²";
  document.querySelector("[value='√']").textContent = isSecondFunction
    ? "∛x"
    : "√x";
}
