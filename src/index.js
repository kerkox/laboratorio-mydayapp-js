import "./css/base.css";

import {
  toggleTask,
  showTasksNoEditing,
  updateTaskByTarget,
  loadAllTask,
  generateNewTask,
  clearCompleted,
  filterTasks,
  deleteTask,
} from "./js/utils";

document.addEventListener("DOMContentLoaded", () => {
 loadAllTask();
});

document.querySelector('.todo-list').addEventListener('change', (event) => {
  if (event.target.classList.contains('toggle')) {
    const id = event.target.dataset.id;
    toggleTask(id);
  }
});

document.querySelector(".todo-list").addEventListener("click", (event) => {
  if(event.target.classList.contains("destroy")) {
    deleteTask(event.target);
  }
})

document.querySelector(".todo-list").addEventListener("dblclick", (event) => {
  console.log({event})
  if (["LI", "LABEL"].includes(event.target.tagName)) {
    const li = event.target.parentElement.parentElement;
    li.classList.add("editing");
    showTasksNoEditing(false);
    console.log({ li });
    li.children[1].focus();
  }
});

document.querySelector(".todo-list").addEventListener("keyup", (event) => {
  if(event.key === "Escape")  {
    const li = event.target.parentElement;
    li.classList.remove("editing");
    showTasksNoEditing(true);
  }
  if (event.key === "Enter") {
    console.log("enter", {event});
    const target = event.target;
    updateTaskByTarget(target);
  }  
});

document.querySelector(".new-todo").addEventListener("keyup", (event) => {
  if (event.key === "Enter") {
    generateNewTask();
  }
});

document.querySelector(".clear-completed").addEventListener("click", () => {
  clearCompleted();
});

window.addEventListener("hashchange", (event) => { 
  const filter = window.location.hash ?? '';
  filterTasks(filter);
});

