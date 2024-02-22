import './style.css';
import { displayController, todoManager } from './todoFunctions';

// Element selectors
// Button that opens form for adding new task/project
const openFormBtn = document.getElementById('openFormBtn');
// New todo form
const newTodoForm = document.getElementById('newTodoForm');
// New project form
const newProjectForm = document.getElementById('newProjectForm');
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
// Button that displays create todo
const projectBtn = document.getElementById('newProjectBtn');
// Button that displays create project
const todoBtn = document.getElementById('newTodoBtn');
const projectFormWrapper = document.getElementById('projectFormWrapper');
const todoFormWrapper = document.getElementById('todoFormWrapper');

projectBtn.addEventListener('click', function (e) {
  projectFormWrapper.style.display = 'flex';
  todoFormWrapper.style.display = 'none';
  console.log('made it here');
});

todoBtn.addEventListener('click', function (e) {
  todoFormWrapper.style.display = 'flex';
  projectFormWrapper.style.display = 'none';
  console.log('made it here too');
});

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

// Submit todo form button
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
  todoManager.renderList();

  displayController.closeDialog(newTodoDialog);
  displayController.clearInput(inputFields);
});

newProjectForm.addEventListener('submit', (event) => {
  event.preventDefault();

  let newProject = new todoManager.project(event.currentTarget.title.value);
});
