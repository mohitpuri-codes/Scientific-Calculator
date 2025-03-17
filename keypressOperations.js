import {
  setAndAddDisplayStr,
  setAndAddInputStr,
  updateDisplay,
  getInputStr,
  setInputStr,
  setDisplayStr,
  getDisplayStr,
} from "./script.js";

import { equals } from "./utils.js";
import { ERROR, ENTER, EQUAL } from "./constants.js";
//  Event Listeners.
/**
 * @listens keypress - Listens for keypress events.
 */
document.addEventListener("keypress", keyPressEventHandler);
/**
 * @listens keydown - Listens for keydown events.
 */
document.addEventListener("keydown", backSpaceEventHandler);

/**
 * Event listner for backspace key press to handle input deletion.
 * @param {KeyboardEvent} e - The keypress event object.
 */
function backSpaceEventHandler(e) {
  let inputStr = getInputStr();
  let displayStr = getDisplayStr();
  if (e.key === "Backspace") {
    let updatedInputStr = inputStr.slice(0, -1);
    setInputStr(updatedInputStr);
    let updatedDisplayStr = displayStr.slice(0, -1);
    setDisplayStr(updatedDisplayStr);
    updateDisplay();
  }
}

/**
 * Event listener for keypress events.
 * @param {KeyboardEvent} e - The keypress event object.
 */
function keyPressEventHandler(e) {
  let inputStr = getInputStr();
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
    if (key === ENTER || key === EQUAL) {
      equals();
    } else {
      if (inputStr === ERROR) return;
      setAndAddInputStr(key);
      setAndAddDisplayStr(key);
      updateDisplay();
    }
  }
}
