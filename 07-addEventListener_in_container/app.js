const span = document.getElementById("span");
let counter = 0;

const container = document.querySelector(".container");

container.addEventListener("click", (e) => {
  if (e.target.classList.contains("btn-info")) {
    counter++;
    span.textContent = counter;
  }

  if (e.target.classList.contains("btn-danger")) {
    counter--;
    span.textContent = counter;
  }
});
