import { ERROR, ERROR_INPUT } from "./constants.js";
import { addToHistory } from "./history.js";
import { isDegree } from "./degreeFunctionExponent.js";
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

export function clearCalc() {
  setInputStr("");
  setDisplayStr("");

  updateDisplay();
}

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

export function squareRoot() {
  let inputStr = getInputStr();
  let displayStr = getDisplayStr();
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
export function sine() {
  let checkDegree = isDegree ? "Math.sin((Math.PI/180)*" : "Math.sin(";
  setAndAddInputStr(checkDegree);
  setAndAddDisplayStr("sin(");
  updateDisplay();
}

export function cosine() {
  let checkDegree = isDegree ? "Math.cos((Math.PI/180)*" : "Math.cos(";
  setAndAddInputStr(checkDegree);
  setAndAddDisplayStr("cos(");
  updateDisplay();
}

export function tangent() {
  let checkDegree = isDegree ? "Math.tan((Math.PI/180)*" : "Math.tan(";
  setAndAddInputStr(checkDegree);
  setAndAddDisplayStr("tan(");
  updateDisplay();
}

// Floor, Ceil, Log, Absolute Value functions
export function floorValue() {
  setAndAddInputStr("Math.floor(");
  setAndAddDisplayStr("floor(");
  updateDisplay();
}

export function ceilValue() {
  setAndAddInputStr("Math.ceil(");
  setAndAddDisplayStr("ceil(");
  updateDisplay();
}

export function logarithm() {
  setAndAddInputStr("Math.log(");
  setAndAddDisplayStr("log(");
  updateDisplay();
}

export function naturalLogarithm() {
  setAndAddInputStr("Math.log10(");
  setAndAddDisplayStr("ln(");
  updateDisplay();
}

export function absoluteValue() {
  setAndAddInputStr("Math.abs(");
  setAndAddDisplayStr("abs(");
  updateDisplay();
}

// Square and Power Functions
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

export function xToPowerY() {
  let inputStr = getInputStr();
  if (!inputStr.endsWith("**")) {
    setAndAddInputStr("**");
    setAndAddDisplayStr("^");
    updateDisplay();
  }
}

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

// Function to handle inverse (1/x)
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

    // inputStr = inputStr.replace(/(\d+(\.\d+)?)$/, inverse);
    // displayStr = inputStr;
  }
  updateDisplay();
}

// Function to handle exponent
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

export function factorial(n) {
  if (n === 0 || n === 1) return 1;
  let result = 1;
  for (let i = 2; i <= n; i++) {
    result *= i;
  }
  return result;
}

// Function to handle factorial for the last number of user input
export function factorialHandler() {
  let inputStr = getInputStr();
  if (inputStr === "" || isNaN(inputStr[inputStr.length - 1])) return;

  let num = "";
  let i = inputStr.length - 1;

  // Extract the last number manually
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

// Function to toggle the sign (+/-)
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

export function changeMode() {
  isSecondFunction = !isSecondFunction;

  document.querySelector("[value='square']").textContent = isSecondFunction
    ? "x³"
    : "x²";
  document.querySelector("[value='√']").textContent = isSecondFunction
    ? "∛x"
    : "√x";
}
