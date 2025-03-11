let inputStr = "";
let display = document.querySelector(".display");

document.addEventListener("keydown", backSpaceEventHandler);
document.addEventListener("keypress", keyPressEventHandler);

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
