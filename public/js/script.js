// jshint esversion:9

const items = document.querySelectorAll(".item");


// Cargar horarios seleccionados en local storage
const greenItems = JSON.parse(localStorage.getItem("selectedItems"));

if(greenItems !== null && greenItems.length > 0) {
  items.forEach((item, index) => {
    if(greenItems.indexOf(index) > -1) {
      item.classList.add("selected");
    }
  });
}

items.forEach(item => {
  item.childNodes[9].childNodes[3].value = item.childNodes[5].innerText;

  // Mostrar color de motoristas agotados
  if(item.childNodes[5].innerText === "0" && !item.classList.contains("selected")) {
    item.classList.toggle("full");
  }
  else {
    item.addEventListener("click", () => {
      item.classList.toggle("selected");

      // Guardar horarios seleccionados en local storage
      const selectedItems = document.querySelectorAll(".selected");
      const itemsIndex = [...selectedItems].map(item => {
        return [...items].indexOf(item);
      });
      localStorage.setItem("selectedItems", JSON.stringify(itemsIndex));

      // Actualizar motoristas disponibles en base de datos
      if(item.classList.contains("selected")) {
        item.childNodes[5].innerText--;
        item.childNodes[9].childNodes[3].value = parseInt(item.childNodes[9].childNodes[3].value) - 1;
      }
      else {
        if(item.childNodes[5].innerText < 8)
        item.childNodes[5].innerText++;
        item.childNodes[9].childNodes[3].value = parseInt(item.childNodes[9].childNodes[3].value) + 1;
      }

      item.childNodes[9].submit();
    });
  }
});
