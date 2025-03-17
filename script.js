import {
  equals,
  clearCalc,
  backspace,
  squareRoot,
  square,
  sine,
  cosine,
  tangent,
  floorValue,
  ceilValue,
  logarithm,
  naturalLogarithm,
  absoluteValue,
  powerOfTen,
  xToPowerY,
  pie,
  exponent,
  factorialHandler,
  toggleSign,
  changeMode,
  inverseValue,
} from "./utils.js";

let inputStr = "";
let displayStr = "";
let display = document.querySelector(".display");

document.querySelector(".keys").addEventListener("click", keyClickEventHandler);

document
  .querySelector("#trigonometryDropdown")
  .addEventListener("click", keyClickEventHandler);
document
  .querySelector("#functionDropdown")
  .addEventListener("click", keyClickEventHandler);

export function getInputStr() {
  return inputStr;
}

export function setInputStr(str) {
  inputStr = str;
}

export function getDisplayStr() {
  return displayStr;
}

export function setDisplayStr(str) {
  displayStr = str;
}

export function setAndAddDisplayStr(str) {
  displayStr = displayStr + str;
}

export function setAndAddInputStr(str) {
  inputStr = inputStr + str;
}

// Function to update the display
export function updateDisplay() {
  display.textContent = displayStr || "0";
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
    case "exp":
      toggleExponential();
      break;
    default:
      inputStr += currentKey;
      displayStr += currentKey;
      break;
  }

  updateDisplay();
}

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
