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

// Handle memory operations

let memory = localStorage.getItem("calculatorMemory");
memory = memory !== null ? parseFloat(memory) : null;

// functions of memory operation
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

function memoryClear() {
  memory = null;
  localStorage.removeItem("calculatorMemory");
}

function memoryAdd() {
  let inputStr = getInputStr();
  let currentValue = parseFloat(inputStr) || 0;
  memory = (memory ?? 0) + currentValue;
  localStorage.setItem("calculatorMemory", memory);
}

function memorySub() {
  let inputStr = getInputStr();
  let currentValue = parseFloat(inputStr) || 0;
  memory = (memory ?? 0) - currentValue;
  localStorage.setItem("calculatorMemory", memory);
}

function memorySaveCurrent() {
  let inputStr = getInputStr();
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
