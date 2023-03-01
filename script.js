//Select Elemennts

const form = document.getElementById("todoform");
const todoInput = document.getElementById("newtodo");
const todosListE1 = document.getElementById("todo-list");
const notficationE1 = document.querySelector(".notification");
//vars
let todos = JSON.parse(localStorage.getItem("todos")) || [];
let EditTodoId = -1;
//form submit

form.addEventListener("submit", function (event) {
  event.preventDefault();

  saveTodo();
  renderTodos();
  localStorage.setItem("todos", JSON.stringify(todos));
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
    shownotfication("Todo input is empty");
  } else if (isDuplicate) {
    shownotfication("Todo already exist");
  } else {
    if (EditTodoId >= 0) {
      todos = todos.map((todo, index) => ({
        ...todo,
        value: index === EditTodoId ? todoValue : todo.value,
      }));
      EditTodoId = -1;
    } else {
      todos.push({
        value: todoValue,
        checked: false,
        color: "#" + Math.floor(Math.random() * 16777215).toString(16),
      });
    }
    todoInput.value = "";
  }
}

//render todos
function renderTodos() {
  if (todos.length === 0) {
    todosListE1.innerHTML = "<center> Nothing to do! </center>";
    return;
  }
  //Clear element before a re-render
  todosListE1.innerHTML = "";

  //Render todo
  todos.forEach((todo, index) => {
    todosListE1.innerHTML += `
    <div class="todo" id=${index}>
          <i class="bi ${
            todo.checked ? "bi-check-circle-fill" : "bi-circle"
          } " style=" color: ${todo.color}"
          data-action ="check"
          ></i>
          <p class="${todo.checked ? "checked" : ""}"  data-action ="check">${
      todo.value
    }</p>
          <i class="bi bi-pencil-square" data-action ="edit">  </i>
          <i class="bi bi-x-square"  data-action ="delete"></i>
        </div>        
        </div>`;
  });
}

//Click event listener for all the todos

todosListE1.addEventListener("click", (event) => {
  const target = event.target;
  const parentElement = target.parentNode;

  if (parentElement.className !== "todo") return;
  /// todo id
  const todo = parentElement;
  const todoId = Number(todo.id);
  // target action
  const action = target.dataset.action;
  action === "check" && checkTodo(todoId);
  action === "edit" && editTodo(todoId);
  action === "delete" && deleteTodo(todoId);
});

//check a todo

function checkTodo(todoId) {
  todos = todos.map((todo, index) => ({
    ...todo,
    checked: index === todoId ? !todo.checked : todo.checked,
  }));
  renderTodos();
  localStorage.setItem("todos", JSON.stringify(todos));
}

//edit a todo
function editTodo(todoId) {
  todoInput.value = todos[todoId].value;
  EditTodoId = todoId;
}

//delete a todo

function deleteTodo(todoId) {
  todos = todos.filter((todo, index) => index !== todoId);
  EditTodoId = -1;

  //re-render
  renderTodos();
  localStorage.setItem("todos", JSON.stringify(todos));
}

//show a notfication

function shownotfication(msg) {
  //change the message
  notficationE1.innerHTML = msg;

  //notfication enter
  notficationE1.classList.add("notfi-enter");
  //notfication leave
  setTimeout(() => {
    notficationE1.classList.removel("notif-enter");
  }, 2000);
}
