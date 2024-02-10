import './style.css';
import { displayController } from './display';

// Element selectors
// Button that opens form for adding new task/project
const openFormBtn = document.getElementById('openFormBtn');
// Form overlay
const ovrly = document.getElementById('ovrly');
// Form x
const cross = document.getElementById('cross');
// Form container element
const formContainer = document.getElementById('form-container');
// Form text fields
const inputFields = document.querySelectorAll('.textInput');

// Event Listeners for form/overlay
openFormBtn.addEventListener('click', function (e) {
  displayController.formOn(formContainer);
});
ovrly.addEventListener('click', function () {
  displayController.formOff(formContainer);
  displayController.clearInput(inputFields);
});
cross.addEventListener('click', function () {
  displayController.formOff(formContainer);
  displayController.clearInput(inputFields);
});

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
