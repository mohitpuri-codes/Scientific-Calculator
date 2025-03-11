let inputStr = "";
let displayStr = ""; // Stores user-friendly display expression
let display = document.querySelector(".display");

let keys = document
  .querySelector(".keys")
  .addEventListener("click", keyClickEventHandler);
document.addEventListener("keydown", backSpaceEventHandler);
document.addEventListener("keypress", keyPressEventHandler);
document
  .querySelector("#trigonometryDropdown")
  .addEventListener("click", keyClickEventHandler);
document
  .querySelector("#functionDropdown")
  .addEventListener("click", keyClickEventHandler);

// function to handle the backspace
function backSpaceEventHandler(e) {
  if (e.key === "Backspace") {
    inputStr = inputStr.slice(0, -1);
    display.textContent = inputStr;
  }
}

// function to handle keypress events
function keyPressEventHandler(e) {
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
      evaluate(inputStr);
      inputStr = display.textContent;
    } else {
      if (inputStr === "Error") return;
      inputStr = inputStr + key;
      display.textContent = inputStr;
    }
  }
}

// function to evaluate the expression
function evaluate(inputStr) {
  try {
    if (
      inputStr === "function Error() { [native code] }" ||
      inputStr === "Error"
    )
      return;
    let result = eval(inputStr);
    display.textContent = result.toFixed(3) ?? display.textContent;
  } catch (e) {
    display.textContent = "Error";
  }
}

function equals() {
  try {
    if (
      inputStr === "function Error() { [native code] }" ||
      inputStr === "Error"
    ) {
      return;
    }
    inputStr = eval(inputStr);
    displayStr = inputStr;
  } catch (error) {
    inputStr = "Error";
    displayStr = "Error";
  }
}

function clear() {
  inputStr = "";
  displayStr = "";
}

function backspace() {
  inputStr = inputStr.slice(0, -1);
  displayStr = displayStr.slice(0, -1);
}

function squareRoot() {
  inputStr += "Math.sqrt(";
  displayStr += "√(";
}

function sine() {
  inputStr += "Math.sin(";
  displayStr += "sin(";
}

function cosine() {
  inputStr += "Math.cos(";
  displayStr += "cos(";
}

function tangent() {
  inputStr += "Math.tan(";
  displayStr += "tan(";
}

function floorValue() {
  inputStr += "Math.floor(";
  displayStr += "floor(";
}

function ceilValue() {
  inputStr += "Math.ceil(";
  displayStr += "ceil(";
}

function logarithm() {
  inputStr += "Math.log(";
  displayStr += "log(";
}

function naturalLogarithm() {
  inputStr += "Math.log10(";
  displayStr += "ln(";
}

function absoluteValue() {
  inputStr += "Math.abs(";
  displayStr += "abs(";
}

function square() {
  inputStr += "**2";
  displayStr += "²";
}

function powerOfTen() {
  inputStr += "10**";
  displayStr += "10^";
}

function xToPowerY() {
  inputStr += "**";
  displayStr += "^";
}

function inverseValue() {
  inputStr = "1/(" + inputStr;
  displayStr = "1/(" + displayStr;
}

function exponent() {
  inputStr += "Math.E.toFixed(3)";
  displayStr += "e";
}

function factorial(n) {
  if (n === 0 || n === 1) {
    return 1;
  }
  return n * factorial(n - 1);
}

function toggleSign() {
  if (inputStr === "") inputStr = "0";
  if (typeof inputStr !== "string") inputStr = inputStr.toString();

  let match = inputStr.match(/(\d+(\.\d+)?)$/);

  if (match) {
    let num = Number(match[1]);
    let toggled = -num;
    inputStr = inputStr.replace(/(\d+(\.\d+)?)$/, `${toggled}`);
    displayStr = inputStr;
  }
}

function keyClickEventHandler(e) {
  let currentKey = e.target.closest("button")?.value;
  if (!currentKey) return;

  if (currentKey === "equals") {
    equals();
  } else if (currentKey === "backspace") {
    backspace();
  } else if (currentKey === "√") {
    squareRoot();
  } else if (currentKey === "sin") {
    sine();
  } else if (currentKey === "cos") {
    cosine();
  } else if (currentKey === "tan") {
    tangent();
  } else if (currentKey === "C") {
    clear();
  } else if (currentKey === "e") {
    exponent();
  } else if (currentKey === "floor") {
    floorValue();
  } else if (currentKey === "ceil") {
    ceilValue();
  } else if (currentKey === "log") {
    logarithm();
  } else if (currentKey === "ln") {
    naturalLogarithm();
  } else if (currentKey === "abs") {
    absoluteValue();
  } else if (currentKey === "square") {
    square();
  } else if (currentKey === "10^x") {
    powerOfTen();
  } else if (currentKey === "power") {
    xToPowerY();
  } else if (currentKey === "1/x") {
    inverseValue();
  } else if (currentKey === "+/-") {
    toggleSign();
  } else if (currentKey === "factorial") {
    console.log("input", inputStr);

    let fact = factorial(inputStr);
    console.log(fact);

    inputStr += fact;
    displayStr += "!";
  } else {
    inputStr += currentKey;
    displayStr += currentKey;
  }

  display.textContent = displayStr;
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
