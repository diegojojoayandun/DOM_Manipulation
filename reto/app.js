const fetchData = async () => {
  try {
    const res = await fetch("api.json");
    const data = await res.json();
    renderProducts(data);
    addCarrito(data);
  } catch (error) {
    console.log(error);
  }
};

fetchData();

const renderProducts = (data) => {
  const contenedorProductos = document.querySelector("#contenedor-productos");
  const template = document.querySelector("#template-productos").content;
  const fragment = document.createDocumentFragment();
  data.map((item) => {
    //console.log(item);
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
      //console.log(button.dataset.id);
      const producto = data.find(
        (item) => item.id === parseInt(button.dataset.id)
      );
      producto.cantidad = 1;

      if (shoppingCar.hasOwnProperty(producto.id)) {
        producto.cantidad++;
        producto.total = producto.cantidad * producto.precio;
      }

      shoppingCar[producto.id] = { ...producto };
      //console.log(shoppingCar);
      renderTabla(shoppingCar);
    });
  });
};

const productosTabla = document.querySelector("#items");
const renderTabla = (data) => {
  //   console.log(data);

  const template = document.querySelector("#template-productos-tabla").content;
  const fragment = document.createDocumentFragment();

  //   console.log(typeof data);
  Object.values(data).forEach((item) => {
    console.log(item.title);
    template.querySelector("#td-id").textContent = item.id;
    template.querySelector("#td-title").textContent = item.title;
    template.querySelector("#td-cantidad").textContent = item.cantidad;
    template.querySelector("#td-total").textContent = item.total;
    const clone = template.cloneNode(true);
    fragment.appendChild(clone);
  });
  //   for (let item in data) {
  //     template.querySelector("#td-id").textContent = item.id;
  //     template.querySelector("#td-title").textContent = item.title;
  //     template.querySelector("#td-cantidad").textContent = item.cantidad;
  //     template.querySelector("#td-total").textContent = item.total;
  //     const clone = template.cloneNode(true);
  //     fragment.appendChild(clone);
  //   }

  //   data.forEach((item) => {
  //     template.querySelector("#td-id").textContent = item.id;
  //     template.querySelector("#td-title").textContent = item.title;
  //     template.querySelector("#td-cantidad").textContent = item.cantidad;
  //     template.querySelector("#td-total").textContent = item.total;
  //     const clone = template.cloneNode(true);
  //     fragment.appendChild(clone);
  //   });

  console.log(productosTabla);

  productosTabla.appendChild(fragment);
};
