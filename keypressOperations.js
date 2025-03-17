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
import { ERROR } from "./constants.js";
// function to handle keypress events

document.addEventListener("keypress", keyPressEventHandler);
document.addEventListener("keydown", backSpaceEventHandler);

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
    if (key === "Enter" || key === "=") {
      equals();
    } else {
      if (inputStr === ERROR) return;
      setAndAddInputStr(key);
      setAndAddDisplayStr(key);
      updateDisplay();
    }
  }
}
