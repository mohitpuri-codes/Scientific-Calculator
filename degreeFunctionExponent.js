import {
  setDisplayStr,
  setInputStr,
  getDisplayStr,
  getInputStr,
  updateDisplay,
} from "./script.js";
import { DEGREE, FE } from "./constants.js";

/**
 * Tracks wheather the calculator is in degrees mode(true) or radians mode(false)
 * @type {boolean}
 */
let isDegree = true;
/**
 * Tracks wheather the scientific notation mode is active
 * @type {boolean}
 */
let isExponential = false; // Track the scientific notation

/**
 * Adds event listener to handle degree and scientific notation toggle
 */
document
  .querySelector(".calulate-degree")
  .addEventListener("click", degreeClickEventHandler);

/**
 * Toggles between degrees and radians mode
 */
function degree() {
  isDegree = !isDegree;
  document.querySelector("#deg").textContent = isDegree ? "DEG" : "RAD";
}

export function getDegree() {
  return isDegree;
}

/**
 * Handles the click event for toggling degree mode or scientific notation
 * @param {*} e - The event object
 */
function degreeClickEventHandler(e) {
  let currentKey = e.target.closest("button")?.value;

  switch (currentKey) {
    case DEGREE:
      degree();
      break;
    case FE:
      toggleExponential();
    default:
      break;
  }
}

/**
 * Toggles the displayed value between standard and scientific notation
 */
export function toggleExponential() {
  let inputStr = getInputStr();
  if (!inputStr || isNaN(Number(inputStr))) return;

  let num = Number(inputStr);
  isExponential = !isExponential;

  if (isExponential) {
    let exponent = num.toExponential().split("e");
    let updatedInputStr = `${exponent[0]}*10**${Number(exponent[1])}`;
    let updatedDisplayStr = `${exponent[0]}*10^${Number(exponent[1])}`;
    setInputStr(updatedInputStr);
    setDisplayStr(updatedDisplayStr);
    isExponential = false;
  } else {
    updatedInputStrinputStr = num.toString();
    setInputStr(updatedInputStr);
    setDisplayStr(getInputStr());
  }

  updateDisplay();
}
