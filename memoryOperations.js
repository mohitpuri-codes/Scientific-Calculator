import {
  MEMOERY_ADD,
  MEMORY_RECALL,
  MEMORY_CLEAR,
  MEMORY_SUBTRACT,
  MEMORY_SAVE,
  CALCULATOR_MEMORY,
} from "./constants.js";
import {
  setDisplayStr,
  setInputStr,
  getDisplayStr,
  getInputStr,
  updateDisplay,
} from "./script.js";

document
  .querySelector(".memory-clear-container")
  .addEventListener("click", handleMemoryClick);

// Initialize memory from localStorage.
let memory = localStorage.getItem(CALCULATOR_MEMORY);
memory = memory !== null ? parseFloat(memory) : null;

/**
 * Recalls the stored memory value.
 */
function memoryRecall() {
  if (memory !== null) {
    let inputStr = getInputStr();
    let displayStr = getDisplayStr();
    inputStr =
      inputStr === "0" ? memory.toString() : inputStr + memory.toString();
    setInputStr(inputStr);
    displayStr =
      displayStr === "0" ? memory.toString() : displayStr + memory.toString();
    setDisplayStr(displayStr);
  }
}

/**
 * clears the stored memory value.
 */
function memoryClear() {
  memory = null;
  localStorage.removeItem(CALCULATOR_MEMORY);
}

/**
 * Adds the current input value to the stored memory.
 */
function memoryAdd() {
  let inputStr = getInputStr();
  let currentValue = parseFloat(inputStr) || 0;
  memory = (memory ?? 0) + currentValue;
  localStorage.setItem(CALCULATOR_MEMORY, memory);
}

/**
 * Subtracts the current input value to the stored memory.
 */
function memorySub() {
  let inputStr = getInputStr();
  let currentValue = parseFloat(inputStr) || 0;
  memory = (memory ?? 0) - currentValue;
  localStorage.setItem(CALCULATOR_MEMORY, memory);
}

/**
 * Saves the current input value into memory.
 */
function memorySaveCurrent() {
  let inputStr = getInputStr();
  let currentValue = parseFloat(inputStr);
  if (!isNaN(currentValue)) {
    memory = currentValue;
    localStorage.setItem(CALCULATOR_MEMORY, memory);
  }
}

/**
 *
 * Handles memory button clicks and executes the corresponding memory operations.
 * @param {Event} e - The click event object
 */
function handleMemoryClick(e) {
  let currentKey = e.target.closest("button")?.textContent.trim();
  if (!currentKey) return;

  switch (currentKey) {
    case MEMORY_CLEAR:
      memoryClear();
      break;
    case MEMORY_RECALL:
      memoryRecall();
      break;
    case MEMOERY_ADD:
      memoryAdd();
      break;
    case MEMORY_SUBTRACT:
      memorySub();
      break;
    case MEMORY_SAVE:
      memorySaveCurrent();
      break;
  }
  // Ensure that buttons update dynamically
  updateMemoryButtons();
  updateDisplay();
}

/**
 * Updates the appearance of memory buttons (MC and MR) based on memory availability.
 */
function updateMemoryButtons() {
  let hasMemory = localStorage.getItem(CALCULATOR_MEMORY) !== null;
  document
    .querySelectorAll(
      '.memory-clear-container button[value="MC"], .memory-clear-container button[value="MR"]'
    )
    .forEach((btn) => btn.classList.toggle("fade-color", !hasMemory));
}

//  Initialize memory button states
updateMemoryButtons();
