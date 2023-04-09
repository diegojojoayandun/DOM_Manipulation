function usarFragment() {
  const mylist = document.getElementById("lista");
  const arrayOfIntegers = [10, 11, 20, 1, 45];

  const fragment = document.createDocumentFragment();
  arrayOfIntegers.map((item) => {
    const li = document.createElement("li");
    li.textContent = item;
    fragment.appendChild(li);
  });

  mylist.appendChild(fragment);

  console.log(mylist);
}

usarFragment();
