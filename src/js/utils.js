import {
  toggleUpdateTask,
  createNewTask,
  updateTask,
  getAllTasks,
  clearCompletedTasks,
  deleteTaskById,
  tasks
} from "./store.js";

export const toggleTask = (id) => {
  const tasks = toggleUpdateTask(id)
  showAllTasks(tasks);  
};

export const generateNewTask = () => {
  addNewTask();
  hideMainAndFooterIfEmptyTask(tasks);
  showAllTasks(tasks);
  clearInput();
};

export const loadAllTask = () => {
  let tasks = getAllTasks();
  showAllTasks(tasks);
  hideMainAndFooterIfEmptyTask(tasks);
  filterTasks(window.location.hash);
};

export const updateTaskByTarget = (target) => {
  const li = target.parentElement;
  const id = li.children[0].children[0].dataset.id;
  const value = target.value;
  updateTask(id, value.toString().trim());
  li.classList.remove("editing");
  showTasksNoEditing(true);
  li.children[0].children[1].innerText = value;
};

const updateTaskCount = (tasks) => {
  const count = tasks.filter((task) => !task.completed).length;
  const todoCount = document.querySelector(".todo-count");
  todoCount.innerHTML = `<strong>${count}</strong> item${count != 1 ? "s" : ""} left`;
  document.querySelector(".clear-completed").classList.toggle("hidden", tasks.length === count);
};

const getTaskHTML = (task) => {
  const li = document.createElement("li");
  task.completed && li.setAttribute("class", "completed");
  li.innerHTML = `
    <div class="view">
      <input class="toggle" type="checkbox" data-id="${task.id}" ${
    task.completed ? "checked" : ""
  }/>
      <label>${task.title}</label>
      <button class="destroy"></button>
    </div>
    <input class="edit" value="${task.title}" />
  `;
  return li;
};

export const showAllTasks = (tasks) => {
  const ul = document.querySelector(".todo-list");
  ul.innerHTML = "";
  tasks.forEach((task) => {
    const li = getTaskHTML(task);
    ul.appendChild(li);
  });
  updateTaskCount(tasks);
};

export const hideMainAndFooterIfEmptyTask = (tasks) => {
  if (tasks.length === 0) {
    document.querySelector(".main").classList.add("hidden");
    document.querySelector(".footer").classList.add("hidden");
  } else {
    document.querySelector(".main").classList.remove("hidden");
    document.querySelector(".footer").classList.remove("hidden");
  }
};

export const addNewTask = () => {
  const title = document.querySelector(".new-todo").value.trim();
  if (title) {
    createNewTask(title);
    showAllTasks(tasks);
  }
};

export const showTasksNoEditing = (show = true) => {
  const lis = document.querySelectorAll(".todo-list li");
  lis.forEach((li) => {
    if (show) {
      li.classList.remove("hidden");
    } else if (!li.classList.contains("editing")) {
      li.classList.add("hidden");
    }
  });
};

export const clearInput = () => {
  document.querySelector(".new-todo").value = "";
};

export const clearCompleted = () => {
  const tasksNotCompleted = clearCompletedTasks();
  showAllTasks(tasksNotCompleted);
  filterTasks(window.location.hash);
};

export const filterTasks = (filter) => {
  document.querySelectorAll(`.todo-list li`).forEach((li) => li.classList.remove("hidden"));

  const filters = {
    "#/pending": (task) => !task.completed,
    "#/completed": (task) => task.completed,
    "#/": (_) => true
  };
  const filterTask = (task) => filters[filter] ? filters[filter](task) : true;
  let tasks = getAllTasks();
  tasks = tasks.filter((task) => filterTask(task));
  showAllTasks(tasks);
  selectFilter(filter);
};

export const selectFilter = (filter) => {
  document
    .querySelectorAll(".filters li a")
    .forEach((a) => a.classList.remove("selected"));
  switch (filter) {
    case "#/pending":
      document
        .querySelector('.filters li [href="#/pending"]')
        .classList.add("selected");
      break;
    case "#/completed":
      document
        .querySelector('.filters li [href="#/completed"]')
        .classList.add("selected");
      break;
    default:
      document
        .querySelector('.filters li [href="#/"]')
        .classList.add("selected");
      break;
  }
};


export const deleteTask = (target) => {
  const li = target.parentElement.parentElement;
  const id = li.children[0].children[0].dataset.id;
  const tasksNotDeleted = deleteTaskById(id);
  showAllTasks(tasksNotDeleted);
  hideMainAndFooterIfEmptyTask(tasksNotDeleted);
}