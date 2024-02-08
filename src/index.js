import './style.css';
import displayController from './display.js';

// Element selectors
// Button that opens form for adding new task/project
const openFormBtn = document.getElementById('openFormBtn');
// Form overlay
const ovrly = document.getElementById('ovrly');
// Form x
const cross = document.getElementById('cross');
// Form container element
const formContainer = document.getElementById('form-container');

// Event Listeners for form/overlay
openFormBtn.addEventListener('click', function (e) {
  formOn();
});
ovrly.addEventListener('click', function () {
  formOff();
});
cross.addEventListener('click', function () {
  formOff();
});

displayController.renderToDos();
// Enables the form and overlay
function formOn() {
  ovrly.style.display = 'block';
  formContainer.style.display = 'block';
}

// Disables the form and overlay
function formOff() {
  ovrly.style.display = 'none';
  formContainer.style.display = 'none';
}

// to-do constructor
function createTask(title, description, dueDate, priority) {
  this.title = title;
  this.description = description;
  this.dueDate = dueDate;
  this.priority = priority;
}

function createProject(title, description, dueDate, priority, taskList) {
  this.title = title;
  this.description = description;
  this.dueDate = dueDate;
  this.priority = priority;
  this.taskList = taskList;
}

const listManager = function () {};
