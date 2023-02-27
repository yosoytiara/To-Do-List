//Select Elemennts

const form = document.getElementById("todoform");
const todoInput = document.getElementById("newtodo");

//vars
let todo = [];
//form submit

form.addEventListener("submit", function (event) {
  event.preventDefault();

  saveTodo();
});

//save todo

function saveTodo() {
  const todoValue = todoInput.value;

  const todo = {
    value: todoValue,
    checked: false,
    color: "#" + Math.floor(),
  };
}
