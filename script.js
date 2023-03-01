//Select Elemennts

const form = document.getElementById("todoform");
const todoInput = document.getElementById("newtodo");
const todosListE1 = document.getElementById("todo-list");

//vars
let todos = [];
//form submit

form.addEventListener("submit", function (event) {
  event.preventDefault();

  saveTodo();
  renderTodos();
});

//save todo

function saveTodo() {
  const todoValue = todoInput.value;
  //check if todo empty
  const isEmpty = todoValue === "";

  //check for duplicate todos
  const isDuplicate = todos.some(
    (todo) => todo.value.toUpperCase() === todoValue.toUpperCase()
  );

  if (isEmpty) {
    alert("Todo input is empty");
  } else if (isDuplicate) {
    alert("Todo already exist");
  } else {
    todos.push({
      value: todoValue,
      checked: false,
      color: "#" + Math.floor(Math.random() * 16777215).toString(16),
    });

    todoInput.value = "";
  }
}

//render todos
function renderTodos() {
  //Clear element before a re-render
  todosListE1.innerHTML = "";

  //Render todo
  todos.forEach((todo, index) => {
    todosListE1.innerHTML += `
    <div class="todo" id=${index}>
          <i class="bi ${
            todo.checked ? "bi-check-circle-fill" : "bi-circle"
          } " style=" color: ${todo.color}"></i>
          <p class="">${todo.value}</p>
          <i class="bi bi-pencil-square"></i>
          <i class="bi bi-x-square"></i>
        </div>        
        </div>`;
  });
}

//Click event listener for all the todos

todosListE1.addEventListener("click", (event) => {
  const target = event.target;
});
