import { format, parseISO } from 'date-fns';

export const displayController = (function () {
  function renderToDos() {
    console.log('renderToDos');
  }

  // Closes a dialogue
  function closeDialog(dialog) {
    dialog.close();
  }

  // Opens a dialog
  function openDialog(dialog) {
    dialog.showModal();
  }

  // Enables form and overlay
  function formOn(dialog) {
    openDialog(dialog);

    //form.style.display = 'block';
    //overlayOn();
  }

  // Disables form and overlay
  function formOff(dialog) {
    closeDialog(dialog);

    //form.style.display = 'none';
    //overlayOff();
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

    // First container
    const containerOne = document.createElement('div');
    containerOne.classList.add('inter-container-one');
    newDiv.appendChild(containerOne);

    // Check button with icon
    const checkBtn = document.createElement('button');
    checkBtn.classList.add('todoCheckBtn');
    checkBtn.innerHTML = '<i class="fa fa-check fa-lg"></i>';
    containerOne.appendChild(checkBtn);
    addCheckedListener(checkBtn);
    addStrikeListener(checkBtn);

    // Priority div
    const prioContainer = document.createElement('div');
    prioContainer.classList.add('prioContainer');
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
    containerOne.appendChild(prioContainer);
    prioContainer.appendChild(priority);

    // Todo title
    const title = document.createElement('p');
    title.classList.add('todoTitle');
    title.textContent = todo.title;
    containerOne.appendChild(title);

    // Second container
    const containerTwo = document.createElement('div');
    containerTwo.classList.add('inter-container-two');
    newDiv.appendChild(containerTwo);

    // Detail button (for displaying date/details)
    const detailBtn = document.createElement('button');
    const detailContainer = document.createElement('div');
    detailContainer.classList.add('detailBtnContainer');
    detailBtn.classList.add('todoDetailBtn');
    detailBtn.innerText = 'Details';
    containerTwo.appendChild(detailContainer);
    detailContainer.appendChild(detailBtn);

    // Due Date
    const dueDate = document.createElement('div');
    dueDate.classList.add('dueDate');
    dueDate.textContent = convertDate(todo.dueDate);
    containerTwo.appendChild(dueDate);

    // Delete button with icon
    const deleteBtn = document.createElement('button');
    deleteBtn.classList.add('todoDeleteBtn');
    deleteBtn.innerHTML = '<i class="fa fa-trash fa-lg"></i>';
    containerTwo.appendChild(deleteBtn);
    addRemoveListener(deleteBtn);

    // Link object to dom element
    newDiv.todoObj = todo;
    // Append to list container
    container.appendChild(newDiv);
  }

  // Adds a 'click' listener that deletes the parent's parent element from DOM
  function addRemoveListener(elem) {
    elem.addEventListener('click', function (e) {
      elem.parentNode.parentNode.remove();
    });
  }

  // Adds a 'click' listener that toggles style for completed task
  function addCheckedListener(elem) {
    elem.addEventListener('click', function (e) {
      elem.parentNode.parentNode.classList.toggle('todoChecked');
      console.log('checked');
    });
  }

  // Adds 'click' listener that toggles strikethrough text
  function addStrikeListener(elem) {
    elem.addEventListener('click', function (e) {
      // Selects second child of parent todoItem
      elem.parentNode.children[2].classList.toggle('todoTitleChecked');
    });
  }

  // Converts a date to output format
  function convertDate(date) {
    var newDate = format(parseISO(date), 'MMM d');

    return newDate;
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
