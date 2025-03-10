document
  .querySelector("#trigonometry-dropdown")
  .addEventListener("click", myFunction);

document
  .querySelector("#functional-dropdown")
  .addEventListener("click", functionDropdown);

function myFunction() {
  document.getElementById("myDropdown").classList.toggle("show");
}

// Function to toggle function dropdown
function functionDropdown() {
  document.getElementById("functionDropdown").classList.toggle("showFn");
}

// Close dropdowns if the user clicks outside of them
window.onclick = function (event) {
  let trigDropdown = document.getElementById("myDropdown");
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
