document.addEventListener("DOMContentLoaded", () => {
  const todoInput = document.getElementById("todo-input");
  const addTaskButton = document.getElementById("add-task-btn");
  const todoList = document.getElementById("todo-list");

  let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

  tasks.forEach((task) => renderTasks(task));

  // Replace the existing click event listener
  addTaskButton.addEventListener("click", addTask);

  // Add a keyup event listener to the input field for Enter key
  todoInput.addEventListener("keyup", (e) => {
    if (e.key === "Enter") {
      addTask();
    }
  });

  // Function to add a new task
  function addTask() {
    const taskText = todoInput.value.trim();

    if (taskText === "") {
      alert("Please enter a task.");
      return;
    }

    const newTask = {
      id: Date.now(),
      text: taskText,
      completed: false,
    };
    tasks.push(newTask);
    saveTaks();
    todoInput.value = "";
    console.log(tasks);

    renderTasks(newTask);
  }

  function saveTaks() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }

  function renderTasks(task) {
    const li = document.createElement("li");
    li.setAttribute("data-id", task.id);
    if (task.completed) {
      li.classList.add("completed");
    }
    li.innerHTML = `
        <span>${task.text}</span>
        <button class="delete-btn">Delete</button>
    `;
    li.addEventListener("click", (e) => {
      if (e.target.tagName === "BUTTON") return;
      task.completed = !task.completed;
      li.classList.toggle("completed");
      saveTaks();
    });

    li.querySelector(".delete-btn").addEventListener("click", (e) => {
      e.stopPropagation(); // prevent toggle from firing
      tasks = tasks.filter((t) => t.id !== task.id);
      li.remove();
      saveTaks();
    });

    todoList.appendChild(li);
  }
});
