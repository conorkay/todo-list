import { format } from 'date-fns';

export const displayController = (function () {
  function renderToDos() {
    console.log('renderToDos');
  }

  // Enables form and overlay
  function formOn(form) {
    form.style.display = 'block';
    overlayOn();
  }

  // Disables form and overlay
  function formOff(form) {
    form.style.display = 'none';
    overlayOff();
  }

  // Enables overlay
  function overlayOn() {
    ovrly.style.display = 'block';
  }

  // Disables overlay
  function overlayOff() {
    ovrly.style.display = 'none';
  }

  // Clears form input, takes nodelist param
  function clearInput(inputFields) {
    if (inputFields.length === 0) {
      return;
    }

    inputFields.forEach(function (currentValue) {
      currentValue.value = '';
    });

    uncheckRadios();
  }

  // clears selection of all radio buttons
  function uncheckRadios() {
    var elements = document.getElementsByTagName('input');

    for (var i = 0; i < elements.length; i++) {
      if (elements[i].type == 'radio') {
        elements[i].checked = false;
      }
    }
  }

  // Creates a DOM element for a new todo
  function createTodoElem(container, todo) {
    const newDiv = document.createElement('div');
    newDiv.classList.add('todoItem');

    // Delete button with icon
    const checkBtn = document.createElement('button');
    checkBtn.classList.add('todoCheckBtn');
    checkBtn.innerHTML = '<i class="fa fa-check fa-lg"></i>';
    newDiv.appendChild(checkBtn);
    addCheckedListener(checkBtn);
    addStrikeListener(checkBtn);

    // Todo title
    const title = document.createElement('p');
    title.classList.add('todoTitle');
    title.textContent = todo.title;
    newDiv.appendChild(title);

    // Priority div
    const priority = document.createElement('div');
    if (todo.priority === 'Low') {
      priority.classList.add('prioLow');
    } else if (todo.priority === 'Mid') {
      priority.classList.add('prioMid');
    } else if (todo.priority === 'High') {
      priority.classList.add('prioHigh');
    } else {
      console.log('prio error');
    }
    priority.textContent = todo.priority;
    newDiv.appendChild(priority);

    // Detail button (for displaying date/details)
    const detailBtn = document.createElement('button');
    detailBtn.classList.add('todoDetailBtn');
    detailBtn.innerText = 'Details';
    newDiv.appendChild(detailBtn);

    // Delete button with icon
    const deleteBtn = document.createElement('button');
    deleteBtn.classList.add('todoDeleteBtn');
    deleteBtn.innerHTML = '<i class="fa fa-trash fa-lg"></i>';
    newDiv.appendChild(deleteBtn);
    addRemoveListener(deleteBtn);

    // Link object to dom element
    newDiv.todoObj = todo;
    // Append to list container
    container.appendChild(newDiv);
  }

  // Deletes element from DOM
  function removeElement(elem) {
    elem.remove();
  }

  // Adds a 'click' listener that deletes the parent element from DOM
  function addRemoveListener(elem) {
    elem.addEventListener('click', function (e) {
      removeElement(elem.parentNode);
    });
  }

  // Adds a 'click' listener that toggles style for completed task
  function addCheckedListener(elem) {
    elem.addEventListener('click', function (e) {
      elem.parentNode.classList.toggle('todoChecked');
    });
  }

  // Adds 'click' listener that toggles strikethrough text
  function addStrikeListener(elem) {
    elem.addEventListener('click', function (e) {
      // Selects second child of parent todoItem
      elem.parentNode.children[1].classList.toggle('todoTitleChecked');
    });
  }

  return { renderToDos, formOn, formOff, clearInput, createTodoElem };
})();

export const todoManager = (function () {
  // to-do constructor
  function createTodo(title, description, dueDate, priority) {
    this.title = title;
    this.description = description;
    this.dueDate = dueDate;
    this.priority = priority;
  }

  // Project constructor
  function createProject(title, description, dueDate, priority, taskList) {
    this.title = title;
    this.description = description;
    this.dueDate = dueDate;
    this.priority = priority;
    this.taskList = taskList;
  }

  return { createTodo, createProject };
})();
