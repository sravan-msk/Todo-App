let form = document.getElementById("form");
let list = document.getElementById("list");

let todos = JSON.parse(localStorage.getItem("todos")) || [];

// saveTodoFunction
function saveTodos() {
//   localStorage.setItem("todos", JSON.stringify(todos));
}

let editIdx = -1;
let currentVal = "all";

// Taking the Todos from form
form.addEventListener("submit", (e) => {
  e.preventDefault();
  let text = document.getElementById("display").value.trim();
  let priority = document.getElementById("priority").value;
  if (!text) return;
  if (editIdx == -1) {
    todos.push({
      text,
      priority,
      completed: false,
    });
  } else {
  }
  form.reset();
  saveTodos();
  renderTodos();
});

function renderTodos() {
  list.innerHTML = "";
  todos.forEach((todo, idx) => {
    let li = document.createElement("li");
    li.innerHTML = ` <span class="${todo.completed ? 'line' : ''}" onclick="toggle(${idx})">${todo.text}</span>
         <span class="${todo.priority}">${todo.priority}</span>
         <button onclick="del(${idx})">Del</button>
         <button onclick="edit(${idx})">Edit</button>`;
    list.appendChild(li);
  });
}

function toggle(idx) {
  todos[idx].completed = !todos[idx].completed;
  renderTodos();
  saveTodos();
}
