//const myHeading = document.querySelector("h1"); ACCEDEMOS CON LA TAG HTML

// const myHeading = document.querySelector(".custom-h1"); ACCEDEMOS CON LA CLASE A TRAVES DEL .

const myHeading = document.querySelector("#title-h1"); //AACEDEMOS CON EL ID

myHeading.textContent = "Nuevo Contenido";

const myarray = [1, 2, 3, 4, 5, 6, 7, 8, 9];

const odds = myarray.map((i) => i % 2 == 0);

console.log(odds);
