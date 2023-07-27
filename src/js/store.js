import { CONFIG } from "./config";

export let tasks = null;

export const getAllTasks = () => {
  if(!tasks) {
    console.log("tasks not defined", tasks);
    tasks = JSON.parse(localStorage.getItem(CONFIG.KEY_TASKS)) ?? [];
  } else {
    console.log("tasks defined", tasks);
  }
  return tasks;
};

export const createNewTask = (title) => {
  tasks.push({ id: Date.now(), title: title, completed: false });
  localStorage.setItem(CONFIG.KEY_TASKS, JSON.stringify(tasks));
};

export const updateTask = (id, title) => {
  let taskToUpdate = tasks.find((task) => task.id + "" == id.trim());
  taskToUpdate.title = title;
  localStorage.setItem(CONFIG.KEY_TASKS, JSON.stringify(tasks));
  return tasks;
};

export const toggleUpdateTask = (id) => {
  let task = tasks.find((task) => task.id + "" == id.trim());
  task.completed = !task.completed;
  localStorage.setItem(CONFIG.KEY_TASKS, JSON.stringify(tasks));
  return tasks;  
};

export const clearCompletedTasks = () => {
  tasks = tasks.filter((task) => !task.completed);
  localStorage.setItem(CONFIG.KEY_TASKS, JSON.stringify(tasks));
  return tasks;
};

export const deleteTaskById = (id) => {
  tasks = tasks.filter((task) => task.id + "" !== id);
  localStorage.setItem(CONFIG.KEY_TASKS, JSON.stringify(tasks));
  return tasks;
};
