// History functionality
let history = JSON.parse(localStorage.getItem("calcHistory")) || [];

document.querySelector(".history-btn").addEventListener("click", toggleHistory);
document.addEventListener("click", closeHistoryOnClickOutside);

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

function toggleHistory(e) {
  let historyContainer = document.querySelector(".history-container");
  historyContainer.style.display =
    historyContainer.style.display === "block" ? "none " : "block";
}

export function addToHistory(expression, result) {
  if (history.length >= 5) {
    history.shift();
  }

  history.push(`${expression} = ${result}`);
  localStorage.setItem("calcHistory", JSON.stringify(history));

  updateHistoryUI();
}

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

// History loads on page load
updateHistoryUI();
