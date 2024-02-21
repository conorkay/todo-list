import './style.css';
import { displayController, todoManager } from './todoFunctions';

// Element selectors
// Button that opens form for adding new task/project
const openFormBtn = document.getElementById('openFormBtn');
// New todo form
const newTodoForm = document.getElementById('newTodoForm');
// Form x's
const todoCross = document.getElementById('todoCross');
const detailCross = document.getElementById('detailCross');
// Form text fields
const inputFields = document.querySelectorAll('.textInput, .dateInput');
// Container for list of todo elements
const listContainer = document.getElementById('list-container');
// Dialog that contains the new todo form
const newTodoDialog = document.getElementById('newTodoDialog');
// Dialog that displays details
const detailDialog = document.getElementById('detailDialog');

// Event Listeners for form
openFormBtn.addEventListener('click', function (e) {
  displayController.openDialog(newTodoDialog);
});

// Apply listen to all 'cross' elements

todoCross.addEventListener('click', function () {
  displayController.closeDialog(todoCross.parentNode.parentNode);
  displayController.clearInput(inputFields);
});

detailCross.addEventListener('click', function () {
  displayController.closeDialog(detailCross.parentNode.parentNode);
  displayController.clearDetail();
});

// Submit form button
newTodoForm.addEventListener('submit', (event) => {
  event.preventDefault();

  let newTodo = new todoManager.todo(
    event.currentTarget.title.value,
    event.currentTarget.details.value,
    event.currentTarget.date.value,
    event.currentTarget.priority.value
  );

  console.log(newTodo);

  todoManager.createNewNode(newTodo);

  //displayController.createTodoElem(listContainer, newTodo);

  displayController.closeDialog(newTodoDialog);
  displayController.clearInput(inputFields);
});
