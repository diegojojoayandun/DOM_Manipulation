const lista = document.querySelector("#lista");
const template = document.querySelector("#template-li").content;
const fragmentt = document.createDocumentFragment();

const arrayOfIntegers = [10, 11, 20, 1, 45, 13, 21];

arrayOfIntegers.map((item) => {
  template.querySelector(".text-danger").textContent = item;
  const clone = template.cloneNode(true);
  fragmentt.appendChild(clone);
});

lista.appendChild(fragmentt);
