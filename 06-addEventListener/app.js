const btnAumentar = document.querySelector(".btn-info");
const btnDisminuir = document.querySelector(".btn-danger");
const span = document.getElementById("span");
let counter = 0;

btnAumentar.addEventListener("click", () => {
  counter++;

  span.textContent = counter;
});

btnDisminuir.addEventListener("click", () => {
  counter--;

  span.textContent = counter;
});
