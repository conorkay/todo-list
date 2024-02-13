import './style.css';
import { displayController, todoManager } from './todoFunctions';

// Element selectors
// Button that opens form for adding new task/project
const openFormBtn = document.getElementById('openFormBtn');
// New todo form
const newTodoForm = document.getElementById('newTodoForm');
// Form x
const cross = document.getElementById('cross');
// Form container element
const formContainer = document.getElementById('form-container');
// Form text fields
const inputFields = document.querySelectorAll('.textInput, .dateInput');
// Container for list of todo elements
const listContainer = document.getElementById('list-container');
// Dialog that contains the new todo form
const newTodoDialog = document.getElementById('newTodoDialog');

// Event Listeners for form
openFormBtn.addEventListener('click', function (e) {
  displayController.formOn(newTodoDialog);
});
cross.addEventListener('click', function () {
  displayController.formOff(newTodoDialog);

  //displayController.formOff(formContainer);
  displayController.clearInput(inputFields);
});

newTodoForm.addEventListener('submit', (event) => {
  event.preventDefault();

  console.log(event.currentTarget.title.value);
  console.log(event.currentTarget.details.value);
  console.log(event.currentTarget.date.value);
  console.log(event.currentTarget.priority.value);

  let newTodo = new todoManager.createTodo(
    event.currentTarget.title.value,
    event.currentTarget.details.value,
    event.currentTarget.date.value,
    event.currentTarget.priority.value
  );

  displayController.createTodoElem(listContainer, newTodo);

  console.log(newTodo);

  displayController.formOff(newTodoDialog);
  displayController.clearInput(inputFields);
});
