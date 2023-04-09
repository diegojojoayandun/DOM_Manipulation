function add_button() {
  const buut = document.createElement("button");
  buut.classList.add("spc");

  buut.textContent = "Nuevo";
  document.querySelector(".div-spc").appendChild(buut);
}

function remove_button() {
  document
    .querySelector(".div-spc")
    .removeChild(document.querySelector(".spc"));
}
