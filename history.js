/**
 * Retrives calculation history from localStorage or initializes an empty array.
 * @type {string[]}
 */
let history = JSON.parse(localStorage.getItem("calcHistory")) || [];

// Event listeners
document.querySelector(".history-btn").addEventListener("click", toggleHistory);
document.addEventListener("click", closeHistoryOnClickOutside);

/**
 * Closes the history panel when clicking outside of it.
 * @param {*} e - The click event object.
 */
function closeHistoryOnClickOutside(e) {
  let historyContainer = document.querySelector(".history-container");
  let historyBtn = document.querySelector(".history-btn");

  if (
    historyContainer.style.display === "block" &&
    !historyContainer.contains(e.target) &&
    !historyBtn.contains(e.target)
  ) {
    historyContainer.style.display = "none";
  }
}

/**
 * Toggles the visibility of the history panel.
 * @param {*} e - The click event object.
 */
function toggleHistory(e) {
  let historyContainer = document.querySelector(".history-container");
  historyContainer.style.display =
    historyContainer.style.display === "block" ? "none " : "block";
}

/**
 * Adds a new calculation to the history and updates localStorage
 * @param {string} expression - The mathematical expression
 * @param {string|number} result - The result of the expression
 */
export function addToHistory(expression, result) {
  if (history.length >= 5) {
    history.shift();
  }

  history.push(`${expression} = ${result}`);
  localStorage.setItem("calcHistory", JSON.stringify(history));

  updateHistoryUI();
}

/**
 * Updates the history UI with the latest calculations.
 */
function updateHistoryUI() {
  let historyList = document.querySelector(".history-list");
  historyList.innerHTML = "";
  const historyFragment = document.createDocumentFragment();
  history.forEach((entry) => {
    let li = document.createElement("li");
    li.textContent = entry;
    historyFragment.appendChild(li);
  });
  historyList.appendChild(historyFragment);
}

// Load history on page load
updateHistoryUI();
