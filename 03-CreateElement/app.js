function crear_lista(cuarto) {
  const arrayList = [1, 2, 3, cuarto];

  const mylist = document.createElement("ul");

  //   arrayList.forEach((item) => {
  //     const li = document.createElement("li");
  //     li.textContent = item;
  //     mylist.appendChild(li);
  //   });

  arrayList.map((item) => {
    const li = document.createElement("li");
    li.textContent = item;
    mylist.appendChild(li);
  });

  document.body.appendChild(mylist);
}
crear_lista(4);
