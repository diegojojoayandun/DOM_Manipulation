const fetchData = async () => {
  try {
    const res = await fetch("api.json");
    const data = await res.json();
    renderProductCards(data);
    addCarrito(data);
  } catch (error) {
    console.log(error);
  }
};

fetchData();

const renderProductCards = (data) => {
  const contenedorProductos = document.querySelector("#contenedor-productos");
  const template = document.querySelector("#template-productos").content;
  const fragment = document.createDocumentFragment();
  data.map((item) => {
    template.querySelector(".card-title").textContent = item.title;
    template.querySelector(".card-text").textContent = item.precio;
    template.querySelector("img").src = item.thumbnailUrl;
    template.querySelector("button").dataset.id = item.id;
    const clone = template.cloneNode(true);
    fragment.appendChild(clone);
  });
  contenedorProductos.appendChild(fragment);
};

let shoppingCar = {};

const addCarrito = (data) => {
  const arrayButtons = document.querySelectorAll("button");

  // EVENT DELEGATION
  arrayButtons.forEach((button) => {
    button.addEventListener("click", (event) => {
      const producto = data.find(
        (item) => item.id === parseInt(button.dataset.id)
      );
      producto.cantidad = 1;

      if (shoppingCar.hasOwnProperty(producto.id)) {
        producto.cantidad = shoppingCar[producto.id].cantidad + 1;
        //producto.total = producto.cantidad * producto.precio;
      }
      producto.total = producto.cantidad * producto.precio;

      shoppingCar[producto.id] = { ...producto };

      renderTabla();
    });
  });
};

const productosTabla = document.querySelector("#items");

const renderTabla = () => {
  items.innerHTML = "";

  const template = document.querySelector("#template-productos-tabla").content;
  const fragment = document.createDocumentFragment();

  Object.values(shoppingCar).forEach((item) => {
    template.querySelector("#td-id").textContent = item.id;
    template.querySelector("#td-title").textContent = item.title;
    template.querySelector("#td-cantidad").textContent = item.cantidad;
    template.querySelector("#td-total").textContent = item.total;

    template.querySelector(".btn-success").dataset.id = item.id;
    template.querySelector(".btn-danger").dataset.id = item.id;

    const clone = template.cloneNode(true);
    fragment.appendChild(clone);
  });

  productosTabla.appendChild(fragment);

  buttonActions();
};

const buttonActions = () => {
  const btnAdd = document.querySelectorAll(".btn-success");
  const btnMin = document.querySelectorAll(".btn-danger");

  btnAdd.forEach((button) => {
    button.addEventListener("click", () => {
      const productToAdd = shoppingCar[button.dataset.id];
      productToAdd.cantidad++;
      shoppingCar[button.dataset.id] = { ...productToAdd };
      renderTabla();
    });
  });

  btnMin.forEach((button) => {
    button.addEventListener("click", () => {
      const productToMin = shoppingCar[button.dataset.id];
      productToMin.cantidad--;
      shoppingCar[button.dataset.id] = { ...productToMin };
      renderTabla();
    });
  });
};
