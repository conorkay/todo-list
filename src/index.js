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
// Dialog that contains the new item form
const newItemDialog = document.getElementById('newItemDialog');
// Dialog that displays details
const detailDialog = document.getElementById('detailDialog');
// Button that displays create todo
const projectBtn = document.getElementById('newProjectBtn');
// Button that displays create project
const todoBtn = document.getElementById('newTodoBtn');
// Wrapper for the project form
const projectFormWrapper = document.getElementById('projectFormWrapper');
// Wrapper for the todo form
const todoFormWrapper = document.getElementById('todoFormWrapper');
// Button for 'home' project
const homeBtn = document.getElementById('homeBtn');
// Button for 'day' project
const dayBtn = document.getElementById('dayBtn');
// Button for 'week' project
const weekBtn = document.getElementById('weekBtn');

// Listener for the 'home' project button
homeBtn.addEventListener('click', function (e) {
  todoManager.setCurrentProject('home');
  todoManager.renderProjectList();
});

// Listener for the 'day' project button
dayBtn.addEventListener('click', function (e) {
  todoManager.setCurrentProject('day');
  todoManager.renderProjectList();
});

// Listener for the 'week' project button
weekBtn.addEventListener('click', function (e) {
  todoManager.setCurrentProject('week');
  todoManager.renderProjectList();
});

// Listener for the 'project' button, displays the project form in the dialog
projectBtn.addEventListener('click', function (e) {
  projectFormWrapper.style.display = 'flex';
  todoFormWrapper.style.display = 'none';
});

// Listener for the 'todo' button, displays the todo form in the dialog
todoBtn.addEventListener('click', function (e) {
  todoFormWrapper.style.display = 'flex';
  projectFormWrapper.style.display = 'none';
});

// Listener for the 'new task' button
openFormBtn.addEventListener('click', function (e) {
  displayController.openDialog(newItemDialog);
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

// Listener for the 'create todo' button on the project form
newTodoForm.addEventListener('submit', (event) => {
  event.preventDefault();

  let todoProject = todoManager.getCurrentProject();
  if (todoProject === 'day' || todoProject === 'week') {
    todoProject = 'home';
  }

  let newTodo = new todoManager.todo(
    event.currentTarget.title.value,
    event.currentTarget.details.value,
    event.currentTarget.date.value,
    event.currentTarget.priority.value,
    todoProject
  );

  console.log(newTodo);

  todoManager.createNewNode(newTodo);
  todoManager.renderList();

  displayController.closeDialog(newItemDialog);
  displayController.clearInput(inputFields);
});

// Listener for the 'create project' button on the project form
newProjectForm.addEventListener('submit', (event) => {
  console.log('click');
  event.preventDefault();

  let newProject = new todoManager.project(
    event.currentTarget.projectTitle.value
  );
  console.log(newProject);
  displayController.createProjectElem(newProject);

  displayController.closeDialog(newItemDialog);
  displayController.clearInput(inputFields);
});
