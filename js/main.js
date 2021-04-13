// ======= GET HTML ELEMENT ===================
var todoInput = document.getElementById("todoInput");
var todoItems = document.getElementById("items");
var checkBox;
// ======= GLOBAL VARIABLE  ======
var items;

if (localStorage.getItem("list") == null) {
  items = [];
} else {
  items = JSON.parse(localStorage.getItem("list"));
}
var crud = {
  add: function () {
    var item = {
      task: todoInput.value,
      isCompleted: false,
    };
    if (item.task) {
      items.push(item);
      localStorage.setItem("list", JSON.stringify(items));
    } else {
      alert("SORRY");
    }
  },
  display: function () {
    var container = "";
    var check;
    for (let i = 0; i < items.length; i++) {
      check = items[i].isCompleted ? `<i class="fas fa-check"></i>` : "";
      container += `<li class="bg-white text-muted border-danger rounded p-2 mb-2 d-flex align-items-center"> <span class="checkbox">${check}</span> <span class="pl-2">${items[i].task}</span><li>`;
    }
    todoItems.innerHTML = container;
    AddEventsToCheckBoxs();
  },
};
// crud.display();
todoInput.addEventListener("keypress", function (e) {
  if (e.key == "Enter") {
    crud.add();
    crud.display();
    clearInput();
  }
});
crud.display();

// -------------------- HELPER FUNCTION
function clearInput() {
  todoInput.value = "";
}

function AddEventsToCheckBoxs() {
  checkBox = document.getElementsByClassName("checkbox");
  console.log(checkBox.length);
  for (let i = 0; i < checkBox.length; i++) {
    checkBox[i].addEventListener("click", function (e) {
      if (items[i].isCompleted == true) {
        console.log("true");
        items[i].isCompleted = false;
      } else {
        items[i].isCompleted = true;
      }
      localStorage.setItem("list", JSON.stringify(items));
      crud.display();
      console.log(checkBox);
    });
  }
}
