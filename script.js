import {
  ABSOLUTE_VALUE,
  BACKSPACE,
  CEIL,
  CLEAR,
  COS,
  EQUALS_VALUE,
  ERROR,
  EXP,
  EXPONENT,
  FACTORIAL,
  FLOOR,
  INVERSE,
  LOGARITHM,
  NATURAL_LOGARITHM,
  PI,
  PLUS_MINUS,
  POWER,
  POWER_OF_TEN,
  ROOT,
  SECOND_MODE,
  SINE,
  SQUARE,
  TAN,
} from "./constants.js";
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
import { toggleExponential } from "./degreeFunctionExponent.js";
let inputStr = "";
let displayStr = "";
let display = document.querySelector(".display");

// Event Listeners.
document.querySelector(".keys").addEventListener("click", keyClickEventHandler);
document
  .querySelector("#trigonometryDropdown")
  .addEventListener("click", keyClickEventHandler);
document
  .querySelector("#functionDropdown")
  .addEventListener("click", keyClickEventHandler);

/**
 * Gets the current input string.
 * @return {string} The input string.
 */
export function getInputStr() {
  return inputStr;
}

/**
 * Sets the input string.
 * @param {string} str - The new input string.
 */
export function setInputStr(str) {
  inputStr = str;
}

/**
 * Gets the current display string.
 * @return {string} The display string.
 */
export function getDisplayStr() {
  return displayStr;
}

/**
 * Sets the display string.
 * @param {string} str - The new display string.
 */
export function setDisplayStr(str) {
  displayStr = str;
}

/**
 * Appends to the display string.
 * @param {string} str - The string to append.
 */
export function setAndAddDisplayStr(str) {
  displayStr = displayStr + str;
}

/**
 * Appends to the input string.
 * @param {string} str - The string to append.
 */
export function setAndAddInputStr(str) {
  inputStr = inputStr + str;
}

/**
 * Updates the calculator display.
 */
export function updateDisplay() {
  display.textContent = displayStr || "0";
}

/**
 * Handles button clciks for calculator  operations
 * @param {Event} e - The event object.
 */
function keyClickEventHandler(e) {
  let currentKey = e.target.closest("button")?.value;
  if (!currentKey) return;

  switch (currentKey) {
    case EQUALS_VALUE:
      equals();
      break;
    case BACKSPACE:
      backspace();
      break;
    case SECOND_MODE:
      changeMode();
      break;
    case SINE:
      sine();
      break;
    case COS:
      cosine();
      break;
    case TAN:
      tangent();
      break;
    case CLEAR:
      clearCalc();
      break;
    case EXPONENT:
      exponent();
      break;
    case FLOOR:
      floorValue();
      break;
    case CEIL:
      ceilValue();
      break;
    case LOGARITHM:
      logarithm();
      break;
    case NATURAL_LOGARITHM:
      naturalLogarithm();
      break;
    case ABSOLUTE_VALUE:
      absoluteValue();
      break;
    case SQUARE:
      square();
      break;
    case ROOT:
      squareRoot();
      break;
    case POWER_OF_TEN:
      powerOfTen();
      break;
    case POWER:
      xToPowerY();
      break;
    case INVERSE:
      inverseValue();
      break;
    case PLUS_MINUS:
      toggleSign();
      break;
    case FACTORIAL:
      factorialHandler();
      break;
    case PI:
      pie();
      break;
    case EXP:
      toggleExponential();
      break;
    default:
      if (inputStr === ERROR) return;
      inputStr += currentKey;
      displayStr += currentKey;
      break;
  }

  updateDisplay();
}

// Event Listeners
document
  .querySelector("#trigonometry-dropdown")
  .addEventListener("click", trigonometryFunction);

document
  .querySelector("#functional-dropdown")
  .addEventListener("click", functionDropdown);

/**
 * Toggles the visibility of the trigonometry function dropdown.
 */
function trigonometryFunction() {
  document.getElementById("trigonometryDropdown").classList.toggle("show");
}

/**
 * Toggles the visibility of the functions dropdown.
 */
function functionDropdown() {
  document.getElementById("functionDropdown").classList.toggle("showFn");
}

/**
 * Handles the closing dowpdowns when clicking outside of them
 * @param {Event} event - The event object
 */
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
