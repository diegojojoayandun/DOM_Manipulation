// Credits Ignacio Bluuweb
// https://bluuweb.github.io/

// Gets the information about products from json file
const fetchData = async () => {
  try {
    const res = await fetch("api.json");
    const data = await res.json();
    renderProductCards(data);
    addToShoppingcard(data);
  } catch (error) {
    console.log(error);
  }
};

const itemsTable = document.querySelector("#items");
const footer = document.querySelector("#footer-shoppingCar");
let shoppingCar = {};
fetchData();

// render product cards
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

// Add items to shoppin car
const addToShoppingcard = (data) => {
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

// Render table which contain the products added
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

  itemsTable.appendChild(fragment);

  renderFooter();
  buttonActions();
};

// Action buttons control
const buttonActions = () => {
  const btnAdd = document.querySelectorAll(".btn-success");
  const btnMin = document.querySelectorAll(".btn-danger");

  btnAdd.forEach((button) => {
    button.addEventListener("click", () => {
      const productToAdd = shoppingCar[button.dataset.id];
      productToAdd.cantidad++;
      productToAdd.total = productToAdd.cantidad * productToAdd.precio;

      shoppingCar[button.dataset.id] = { ...productToAdd };
      renderTabla();
    });
  });

  btnMin.forEach((button) => {
    button.addEventListener("click", () => {
      const productToMin = shoppingCar[button.dataset.id];
      productToMin.cantidad--;
      productToMin.total = productToMin.cantidad * productToMin.precio;
      if (productToMin.cantidad === 0) {
        delete shoppingCar[button.dataset.id];
      } else {
        shoppingCar[button.dataset.id] = { ...productToMin };
      }

      renderTabla();
    });
  });
};

// render the footer table
const renderFooter = () => {
  footer.innerHTML = "";

  if (Object.keys(shoppingCar).length === 0) {
    footer.innerHTML = `
        <th scope="row" colspan="5">Carrito vacío con innerHTML</th>
        `;
    return;
  }

  const template = document.querySelector("#template-footer").content;
  const fragment = document.createDocumentFragment();

  // sumar cantidad y sumar totales
  const nCantidad = Object.values(shoppingCar).reduce(
    (acc, { cantidad }) => acc + cantidad,
    0
  );
  const nPrecio = Object.values(shoppingCar).reduce(
    (acc, { cantidad, precio }) => acc + cantidad * precio,
    0
  );

  template.querySelectorAll("td")[0].textContent = nCantidad;
  template.querySelector("span").textContent = nPrecio;

  const clone = template.cloneNode(true);
  fragment.appendChild(clone);

  footer.appendChild(fragment);

  const boton = document.querySelector("#vaciar-carrito");
  boton.addEventListener("click", () => {
    console.log(shoppingCar);
    //shoppingCar = {};
    //renderTabla();
  });
};
