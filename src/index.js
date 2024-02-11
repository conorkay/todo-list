import './style.css';
import { displayController, todoManager } from './todoFunctions';

// Element selectors
// Button that opens form for adding new task/project
const openFormBtn = document.getElementById('openFormBtn');
// Form overlay
const ovrly = document.getElementById('ovrly');
// New todo form
const newTodoForm = document.getElementById('newTodoForm');
// Form x
const cross = document.getElementById('cross');
// Form container element
const formContainer = document.getElementById('form-container');
// Form text fields
const inputFields = document.querySelectorAll('.textInput');
// Container for list of todo elements
const listContainer = document.getElementById('list-container');

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

newTodoForm.addEventListener('submit', (event) => {
  event.preventDefault();

  console.log(event.currentTarget.title.value);
  console.log(event.currentTarget.details.value);
  console.log(event.currentTarget.priority.value);

  let tempDate = 0;

  let newTodo = new todoManager.createTodo(
    event.currentTarget.title.value,
    event.currentTarget.details.value,
    tempDate,
    event.currentTarget.priority.value
  );

  displayController.createTodoElem(listContainer, newTodo);

  console.log(newTodo);

  displayController.formOff(formContainer);
  displayController.clearInput(inputFields);
});
