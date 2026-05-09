let form = document.getElementById("form");
let list = document.getElementById("list");

let todos = JSON.parse(localStorage.getItem("todos")) || [];

// saveTodoFunction
function saveTodos() {
  localStorage.setItem("todos", JSON.stringify(todos));
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
    todos[editIdx].text = text;
    todos[editIdx].priority = priority;
    editIdx = -1;
  }
  form.reset();
  saveTodos();
  renderTodos();
});

function filterOpt(filter) {
  currentVal = filter;
  document.querySelectorAll(".filterBtns button").forEach((btn) => {
    btn.classList.remove("active");
  });
  event.target.classList.add("active");
  renderTodos();
}

function renderTodos() {
  list.innerHTML = "";
  todos.forEach((todo, idx) => {
    if (currentVal === "all") {
    } else if (currentVal === "pending") {
      if (todo.completed) {
        return;
      }
    } else if (currentVal === "completed") {
      if (!todo.completed) {
        return;
      }
    }
    let li = document.createElement("li");
    li.innerHTML = ` <span id="space" class="${todo.completed ? "line" : ""}" onclick="toggle(${idx})">${todo.text}</span>
         <span class="${todo.priority}">${todo.priority}</span>
         <div class="btnContainer">
         <button onclick="del(${idx})"><i class="fa-solid fa-trash"></i></button>
         <button onclick="edit(${idx})"><i class="fa-solid fa-pen-to-square"></i></button>
         </div>`;
    list.appendChild(li);
  });
  document.getElementById("totalTodos").textContent =
    `Total Todos : ${todos.length}`;
}

// Toggle Function
function toggle(idx) {
  todos[idx].completed = !todos[idx].completed;
  renderTodos();
  saveTodos();
}

// Delete Todo
function del(idx) {
  todos.splice(idx, 1);
  renderTodos();
  saveTodos();
}

//Edit Todo
function edit(idx) {
  document.getElementById("display").value = todos[idx].text;
  document.getElementById("priority").value = todos[idx].priority;
  editIdx = idx;
}

document.addEventListener("DOMContentLoaded", () => {
  renderTodos();
});
