// Declare UI vars
const form = document.querySelector('#task-form');
const taskInput = document.querySelector('#task');
const taskCollection = document.querySelector('.collection');
const clearTasksBtn = document.querySelector('.clear-tasks');
const filterInput = document.querySelector('#filter');
const LI = 'li';
const ANCHOR = 'a';

loadAllEventsListerners();

//Load all events listeners
function loadAllEventsListerners() {
  document.addEventListener('DOMContentLoaded', showTasks);
  form.addEventListener('submit', addTaskItem);
  clearTasksBtn.addEventListener('click', clearAllTasks);
  filterInput.addEventListener('keyup', filterTasks);
  taskCollection.addEventListener('click', deleteTask);
}

//Add Task Item
function addTaskItem(e) {
  e.preventDefault();
  let task = taskInput.value;
  if (task === '') {
    alert('Enter new task');
  }
  else {
    const li = document.createElement(LI);
    li.className = "collection-item";
    li.appendChild(document.createTextNode(task));

    const link = document.createElement(ANCHOR);
    link.className = "delete-item secondary-content";
    link.innerHTML = '<i class="fa fa-remove"></i>';

    li.appendChild(link);
    taskCollection.appendChild(li);
    addTaskItemToLocalStorage(task);
    taskInput.value = '';
  }
}

//Add task to Local Storage
function addTaskItemToLocalStorage(task) {
  let tasks = [];
  if (localStorage.getItem('tasks') !== null) {
    tasks = JSON.parse(localStorage.getItem('tasks'));
  }
  tasks.push(task);
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

//Show tasks from LS
function showTasks() {
  let tasks = [];
  if (localStorage.getItem('tasks') !== null) {
    tasks = JSON.parse(localStorage.getItem('tasks'));
  }

  tasks.forEach(function (task) {
    const li = document.createElement(LI);
    li.className = "collection-item";
    li.appendChild(document.createTextNode(task));

    const link = document.createElement(ANCHOR);
    link.className = "delete-item secondary-content";
    link.innerHTML = '<i class="fa fa-remove"></i>';

    li.appendChild(link);
    taskCollection.appendChild(li);
  });
}

// Clear all tasks
function clearAllTasks() {
  if (confirm('Are you sure?')) {
    while (taskCollection.firstChild) {
      taskCollection.removeChild(taskCollection.firstChild);
    }
    clearAllTasksFromLocalStorage();
  }
}

//Clear tasks from localStorage
function clearAllTasksFromLocalStorage() {
  localStorage.removeItem('tasks');
}

function filterTasks(e) {
  const text = e.target.value.toLowerCase();
  document.querySelectorAll('.collection-item').forEach(function (item) {

    const liText = item.firstChild.textContent.toLowerCase();

    if (liText.indexOf(text) !== -1) {
      item.style.display = 'block';
    } else {
      item.style.display = 'none';
    }

  });
}

function deleteTask(e){
  if(e.target.parentElement.classList.contains('delete-item'))
  {
    e.target.parentElement.parentElement.remove();
    let taskName = e.target.parentElement.value;
    //Remove from LS
    let tasks = [];
    if (localStorage.getItem('tasks') !== null) {
      tasks = JSON.parse(localStorage.getItem('tasks'));
    }
    
    tasks.splice(tasks.indexOf(taskName, 1));

    localStorage.setItem(JSON.stringify(tasks));
  }
}