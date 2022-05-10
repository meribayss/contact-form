let btn = document.querySelector(".btn");
let inputs = document.querySelectorAll(".input");
let inp = document.querySelector(".name-input");
let inp2 = document.querySelector(".email-input");
let inp3 = document.querySelector(".image-input");
let list = document.querySelector(".task-list1");
let list2 = document.querySelector(".task-list2");
let list3 = document.querySelector(".task-list3");

render();

btn.addEventListener("click", () => {
  if (inp.value === "" || inp2.value === "" || inp3.value === "") {
    alert("Заполните поле!");
    return;
  }
  let obj = { name: inp.value, email: inp2.value, image: inp3.value };
  setItemToStorage(obj);
  render();
  inp.value = "";
  inp2.value = "";
  inp3.value = "";
});

function setItemToStorage(task) {
  let data = JSON.parse(localStorage.getItem("task-data"));
  data.push(task);
  localStorage.setItem("task-data", JSON.stringify(data));
}

function render() {
  if (!localStorage.getItem("task-data")) {
    localStorage.setItem("task-data", JSON.stringify([]));
  }

  let newData = JSON.parse(localStorage.getItem("task-data"));
  list.innerHTML = "";
  list2.innerHTML = "";
  list3.innerHTML = "";
  newData.forEach((item, index) => {
    let li = document.createElement("p");
    let li2 = document.createElement("p");
    let li3 = document.createElement("img");
    let btnDelete = document.createElement("button");
    let btnEdit = document.createElement("button");
    li.innerText = item.name;
    li2.innerText = item.email;
    li3.setAttribute("src", item.image);
    btnDelete.innerText = "Delete";
    btnEdit.innerText = "Edit";
    list.append(li);
    list2.append(li2);
    list3.append(li3);
    li.append(btnDelete);
    li.append(btnEdit);

    btnDelete.addEventListener("click", () => {
      deleteElement(index);
    });
    btnEdit.addEventListener("click", () => {
      editElement(index);
    });
  });
}

function deleteElement(id) {
  let data = JSON.parse(localStorage.getItem("task-data"));
  data.splice(id, 1);
  localStorage.setItem("task-data", JSON.stringify(data));
  render();
}

let mainModal = document.querySelector(".main-modal");
let btnCloser = document.querySelector(".btn-closer");
let btnSave = document.querySelector(".btn-save");
let inpEdit = document.querySelector(".inp-edit");
let inpEdit2 = document.querySelector(".inp-edit2");
let inpEdit3 = document.querySelector(".inp-edit3");

function editElement(id) {
  mainModal.style.display = "block";
  let data = JSON.parse(localStorage.getItem("task-data"));
  inpEdit.setAttribute("id", id);
  // inpEdit2.setAttribute("id", id);
  // inpEdit3.setAttribute("id", id);
  inpEdit.value = data[id].name;
  // inpEdit2.value = data[id].email;
  // inpEdit3.value = data[id].image;
}

btnSave.addEventListener("click", () => {
  if (
    inpEdit.value.trim() === ""
    // inpEdit.value.trim() === "" ||
    // inpEdit2.value === "" ||
    // inpEdit3.value === ""
  ) {
    alert("Заполните поле!");
    return;
  }
  let data = JSON.parse(localStorage.getItem("task-data"));
  let editTask = {
    name: inpEdit.value,
    email: inpEdit2.value,
    image: inpEdit3.value,
  };
  let index = inpEdit.id;

  data.splice(index, 1, editTask);
  localStorage.setItem("task-data", JSON.stringify(data));
  mainModal.style.display = "none";
  render();
});

btnCloser.addEventListener("click", () => {
  mainModal.style.display = "none";
});
