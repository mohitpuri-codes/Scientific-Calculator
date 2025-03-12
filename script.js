import { ERROR, ERROR_INPUT } from "./constants.js";

let inputStr = "";
let displayStr = "";
let display = document.querySelector(".display");
let isSecondFunction = false; // Track 2nd mode

document.querySelector(".keys").addEventListener("click", keyClickEventHandler);
document.addEventListener("keydown", backSpaceEventHandler);
document.addEventListener("keypress", keyPressEventHandler);
document
  .querySelector("#trigonometryDropdown")
  .addEventListener("click", keyClickEventHandler);
document
  .querySelector("#functionDropdown")
  .addEventListener("click", keyClickEventHandler);

document
  .querySelector(".memory-clear-container")
  .addEventListener("click", handleMemoryClick);

// function to handle the backspace
function backSpaceEventHandler(e) {
  if (e.key === "Backspace") {
    inputStr = inputStr.slice(0, -1);
    displayStr = displayStr.slice(0, -1);
    updateDisplay();
  }
}

// function to handle keypress events
function keyPressEventHandler(e) {
  let allowedKeyPress = new Set([
    "Enter",
    "Backspace",
    "(",
    ")",
    "*",
    "-",
    "+",
    "/",
    ".",
    "=",
  ]);
  let key = e.key;

  if ((key >= "0" && key <= "9") || allowedKeyPress.has(key)) {
    if (key === "Enter" || key === "=") {
      equals();
    } else {
      if (inputStr === ERROR) return;
      inputStr += key;
      displayStr += key;
      updateDisplay();
    }
  }
}

// Function to update the display
function updateDisplay() {
  display.textContent = displayStr || "0";
}

function equals() {
  try {
    if (inputStr === ERROR_INPUT || inputStr === ERROR) {
      return;
    }
    let result = eval(inputStr);
    inputStr = result.toString();
    displayStr = inputStr;
  } catch (error) {
    inputStr = ERROR;
    displayStr = ERROR;
  }
  updateDisplay();
}

function clearCalc() {
  inputStr = "";
  displayStr = "";
  updateDisplay();
}

function backspace() {
  if (inputStr.endsWith("**2") || inputStr.endsWith("**3")) {
    inputStr = inputStr.slice(0, -3); // Remove both **2 or **3
    displayStr = displayStr.slice(0, -1); // Remove the exponent symbol (² or ³)
  } else {
    inputStr = inputStr.slice(0, -1);
    displayStr = displayStr.slice(0, -1);
  }
  updateDisplay();
}

function squareRoot() {
  if (isSecondFunction) {
    inputStr += "Math.cbrt(";
    displayStr += "∛(";
  } else {
    inputStr += "Math.sqrt(";
    displayStr += "√(";
  }
  updateDisplay();
}

// Trigonometric functions
function sine() {
  inputStr += "Math.sin(";
  displayStr += "sin(";
  updateDisplay();
}

function cosine() {
  inputStr += "Math.cos(";
  displayStr += "cos(";
  updateDisplay();
}

function tangent() {
  inputStr += "Math.tan(";
  displayStr += "tan(";
  updateDisplay();
}

// Floor, Ceil, Log, Absolute Value functions
function floorValue() {
  inputStr += "Math.floor(";
  displayStr += "floor(";
  updateDisplay();
}

function ceilValue() {
  inputStr += "Math.ceil(";
  displayStr += "ceil(";
  updateDisplay();
}

function logarithm() {
  inputStr += "Math.log(";
  displayStr += "log(";
  updateDisplay();
}

function naturalLogarithm() {
  inputStr += "Math.log10(";
  displayStr += "ln(";
  updateDisplay();
}

function absoluteValue() {
  inputStr += "Math.abs(";
  displayStr += "abs(";
  updateDisplay();
}

// Square and Power Functions
function square() {
  // Remove previous exponent if backspaced
  inputStr = inputStr.replace(/\*\*3$|\*\*2$/, "");
  displayStr = displayStr.replace(/[²³]$/, "");

  if (inputStr === "" || /[*+\-/^]$/.test(inputStr)) return;

  // if 2nd is clicked then change the inputStr with cube root
  if (isSecondFunction) {
    inputStr += "**3";
    displayStr += "³";
  } else {
    inputStr += "**2"; // Square
    displayStr += "²";
  }

  updateDisplay();
}

function powerOfTen() {
  if (!inputStr.endsWith("10**")) {
    inputStr += "10**";
    displayStr += "10^";
    updateDisplay();
  }
}

function xToPowerY() {
  if (!inputStr.endsWith("**")) {
    inputStr += "**";
    displayStr += "^";
    updateDisplay();
  }
}

function pie() {
  inputStr += "*Math.PI.toFixed(3)";
  displayStr += "π";
  updateDisplay();
}

// Function to handle inverse (1/x)
function inverseValue() {
  if (typeof inputStr !== "string") inputStr = inputStr.toString();
  let match = inputStr.match(/(\d+(\.\d+)?)$/);
  if (match) {
    let num = Number(match[1]);
    let inverse = `1/(${num})`;
    inputStr = inputStr.replace(/(\d+(\.\d+)?)$/, inverse);
    displayStr = inputStr;
  }
  updateDisplay();
}

// Function to handle exponent
function exponent() {
  inputStr += "*Math.E.toFixed(3)";
  displayStr += "e";
  updateDisplay();
}

function factorial(n) {
  if (n === 0 || n === 1) return 1;
  let result = 1;
  for (let i = 2; i <= n; i++) {
    result *= i;
  }
  return result;
}

// Function to handle factorial for the last number of user input
function factorialHandler() {
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
    inputStr = inputStr.slice(0, i + 1) + factValue;
    displayStr += "!";
  }

  updateDisplay();
}

// Function to toggle the sign (+/-)
function toggleSign() {
  if (inputStr === "") inputStr = "0";
  if (typeof inputStr !== "string") inputStr = inputStr.toString();

  let match = inputStr.match(/(-?\d+(\.\d+)?)$/);
  if (match) {
    let num = Number(match[1]);
    let toggled = num * -1;
    inputStr = inputStr.replace(/(-?\d+(\.\d+)?)$/, `${toggled}`);
    displayStr = inputStr;
  }
  updateDisplay();
}

function changeMode() {
  isSecondFunction = !isSecondFunction;

  document.querySelector("[value='square']").textContent = isSecondFunction
    ? "x³"
    : "x²";
  document.querySelector("[value='√']").textContent = isSecondFunction
    ? "∛x"
    : "√x";
}

function keyClickEventHandler(e) {
  let currentKey = e.target.closest("button")?.value;
  if (!currentKey) return;

  switch (currentKey) {
    case "equals":
      equals();
      break;
    case "backspace":
      backspace();
      break;
    case "exp":
      inputStr += "Math.E.toFixed(3)";
      displayStr += "e";
      break;
    case "2nd":
      changeMode();
      break;
    case "sin":
      sine();
      break;
    case "cos":
      cosine();
      break;
    case "tan":
      tangent();
      break;
    case "C":
      clearCalc();
      break;
    case "e":
      exponent();
      break;
    case "floor":
      floorValue();
      break;
    case "ceil":
      ceilValue();
      break;
    case "log":
      logarithm();
      break;
    case "ln":
      naturalLogarithm();
      break;
    case "abs":
      absoluteValue();
      break;
    case "square":
      square();
      break;

    case "√":
      squareRoot();
      break;
    case "10^x":
      powerOfTen();
      break;
    case "power":
      xToPowerY();
      break;
    case "1/x":
      inverseValue();
      break;
    case "+/-":
      toggleSign();
      break;
    case "factorial":
      factorialHandler();
      break;
    case "π":
      pie();
      break;
    case "F-E":
      toggleExponential();
      break;
    default:
      inputStr += currentKey;
      displayStr += currentKey;
      break;
  }

  updateDisplay();
}

// Handle memory operations

let memory = localStorage.getItem("calculatorMemory");
memory = memory !== null ? parseFloat(memory) : null;

// functions of memory operation
function memoryRecall() {
  if (memory !== null) {
    inputStr =
      inputStr === "0" ? memory.toString() : inputStr + memory.toString();
    displayStr =
      displayStr === "0" ? memory.toString() : displayStr + memory.toString();
  }
}

function memoryClear() {
  memory = null;
  localStorage.removeItem("calculatorMemory");
}

function memoryAdd() {
  let currentValue = parseFloat(inputStr) || 0;
  memory = (memory ?? 0) + currentValue;
  localStorage.setItem("calculatorMemory", memory);
}

function memorySub() {
  let currentValue = parseFloat(inputStr) || 0;
  memory = (memory ?? 0) - currentValue;
  localStorage.setItem("calculatorMemory", memory);
}

function memorySaveCurrent() {
  let currentValue = parseFloat(inputStr);
  if (!isNaN(currentValue)) {
    memory = currentValue;
    localStorage.setItem("calculatorMemory", memory);
  }
}

// Event to handle the memory operations
function handleMemoryClick(e) {
  let currentKey = e.target.closest("button")?.textContent.trim();
  if (!currentKey) return;

  switch (currentKey) {
    case "MC":
      memoryClear();
      break;
    case "MR":
      memoryRecall();
      break;
    case "M+":
      memoryAdd();
      break;
    case "M-":
      memorySub();
      break;
    case "MS":
      memorySaveCurrent();
      break;
  }
  // to Ensure that buttons update dynamically
  updateMemoryButtons();
  updateDisplay();
}

// to remove the faded color from the MC and MR button
function updateMemoryButtons() {
  let hasMemory = localStorage.getItem("calculatorMemory") !== null;
  document
    .querySelectorAll(
      '.memory-clear-container button[value="MC"], .memory-clear-container button[value="MR"]'
    )
    .forEach((btn) => btn.classList.toggle("fade-color", !hasMemory));
}
updateMemoryButtons();

// dropdown functionality
document
  .querySelector("#trigonometry-dropdown")
  .addEventListener("click", trigonometryFunction);

document
  .querySelector("#functional-dropdown")
  .addEventListener("click", functionDropdown);

function trigonometryFunction() {
  document.getElementById("trigonometryDropdown").classList.toggle("show");
}

function functionDropdown() {
  document.getElementById("functionDropdown").classList.toggle("showFn");
}

window.onclick = function (event) {
  let trigDropdown = document.getElementById("trigonometryDropdown");
  let funcDropdown = document.getElementById("functionDropdown");

  if (!event.target.closest(".dropbtn")) {
    if (trigDropdown.classList.contains("show")) {
      trigDropdown.classList.remove("show");
    }
  }

  if (!event.target.closest(".functionDropbtn")) {
    if (funcDropdown.classList.contains("showFn")) {
      funcDropdown.classList.remove("showFn");
    }
  }
};
