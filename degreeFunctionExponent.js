import {
  setDisplayStr,
  setInputStr,
  getDisplayStr,
  getInputStr,
  updateDisplay,
} from "./script.js";

export let isDegree = true; // Track toggle between degree and radians
let isExponential = false; // Track the scientific notation

document
  .querySelector(".calulate-degree")
  .addEventListener("click", degreeClickEventHandler);

// change degree to radians and vice-versa
function degree() {
  isDegree = !isDegree;
  document.querySelector("#deg").textContent = isDegree ? "DEG" : "RAD";
}

function degreeClickEventHandler(e) {
  let currentKey = e.target.closest("button")?.value;

  switch (currentKey) {
    case "degree":
      degree();
      break;
    case "F-E":
      toggleExponential();
    default:
      break;
  }
}

// toggle displayed value to scientific notation
function toggleExponential() {
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
