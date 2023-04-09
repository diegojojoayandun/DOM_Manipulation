const span = document.getElementById("span");
let counter = 0;

const container = document.querySelector(".container");

container.addEventListener("click", (e) => {
  e.stopPropagation();
  if (e.target.classList.contains("btn-info")) {
    counter++;
    span.textContent = counter;
  }

  if (e.target.classList.contains("btn-danger")) {
    counter--;
    span.textContent = counter;
  }
});
document.body.addEventListener("click", (e) => {
  console.log("hiciste click");
});
