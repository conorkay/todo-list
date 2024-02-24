import {
  format,
  parseISO,
  compareAsc,
  isEqual,
  isAfter,
  isBefore,
  add,
} from 'date-fns';

// Detail display title
const detailTitle = document.querySelector('#titleDisplay');
// Detail display project title
const detailProjectTitle = document.querySelector('#projectTitleDisplay');
// Detail display details
const detailDescription = document.querySelector('#descriptionDisplay');
// Detail display due date
const detailDate = document.getElementById('dateDisplay');
// Detail priority display
const detailPriority = document.getElementById('prioDisplay');
const todoContainer = document.getElementById('list-container');
// Project list
const projectList = document.getElementById('projectList');

export const displayController = (function () {
  // Clears all todo's from the DOM
  function clearTodos() {
    while (todoContainer.firstChild) {
      todoContainer.removeChild(todoContainer.lastChild);
    }
  }

  // Renders all todo elements from a linked list
  function renderToDos(linkedList) {
    console.log('renderToDos');
    clearTodos();
    let node = linkedList.head;
    while (node != null) {
      createTodoElem(node.todo);
      node = node.next;
    }
  }

  // Renders todo elements from a linked list that match a given project name
  function renderProjectTodos(linkedList, projectName) {
    let node = linkedList.head;
    clearTodos();

    // If current project is 'home', render all todos
    if (projectName === 'home') {
      renderToDos(linkedList);
      return;
    }

    // If 'day' project is selected, only render todos due today
    else if (projectName === 'day') {
      while (node != null) {
        if (todoManager.compareDateToToday(node.todo.dueDate) === 0) {
          createTodoElem(node.todo);
        }
        node = node.next;
      }
      return;
    }

    // If 'week' is selected, only render todos due within 7 days
    else if (projectName === 'week') {
      while (node != null) {
        if (todoManager.withinWeek(node.todo.dueDate)) {
          createTodoElem(node.todo);
        }
        node = node.next;
      }
      return;
    }

    // If 'overdue' is selected, only render unchecked todos with a due date
    // prior to today's date
    else if (projectName === 'overdue') {
      while (node != null) {
        if (todoManager.isOverdue(node.todo.dueDate) && !node.todo.checked) {
          createTodoElem(node.todo);
        }
        node = node.next;
      }
      return;
    }

    // If custom project, only render todos that match said project
    while (node != null) {
      if (node.todo.project.toLowerCase() === projectName.toLowerCase()) {
        createTodoElem(node.todo);
      }
      node = node.next;
    }
  }

  // Closes a dialogue
  function closeDialog(dialog) {
    dialog.close();
  }

  // Opens a dialog
  function openDialog(dialog) {
    dialog.showModal();
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

  // Clear detail dialog
  function clearDetail() {
    detailTitle.textContent = '';
    detailProjectTitle.textContent = '';
    detailDescription.textContent = '';
    detailPriority.className = '';
  }

  // Creates a DOM element for a new project
  function createProjectElem(project) {
    const newBtn = document.createElement('button');
    newBtn.classList.add('projectButton');
    newBtn.innerText = project.title;
    projectList.appendChild(newBtn);
    addProjectListener(newBtn);
  }

  // Adds listener to a project DOM element
  function addProjectListener(elem) {
    elem.addEventListener('click', function (e) {
      todoManager.setCurrentProject(elem.innerText);
      console.log(todoManager.getCurrentProject());
      todoManager.renderProjectList();
    });
  }

  // Creates a DOM element for a new todo
  function createTodoElem(todo) {
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
    const titleContainer = document.createElement('div');
    const title = document.createElement('p');
    titleContainer.classList.add('titleContainer');
    title.classList.add('todoTitle');
    title.textContent = todo.title;
    containerOne.appendChild(titleContainer);
    titleContainer.appendChild(title);

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
    addDetailListener(detailBtn);

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
    todoContainer.appendChild(newDiv);
    if (todo.checked) {
      newDiv.classList.toggle('todoChecked');
      newDiv.children[0].children[2].classList.toggle('todoTitleChecked');
    }
  }

  // Adds a 'click' listener that deletes the parent's parent element from DOM
  function addRemoveListener(elem) {
    elem.addEventListener('click', function (e) {
      let todoElem = elem.parentNode.parentNode;
      todoManager.deleteTodoNode(todoElem.todoObj);
      todoElem.remove();
    });
  }

  // Adds a 'click' listener that displays the todo details
  function addDetailListener(elem) {
    elem.addEventListener('click', function (e) {
      console.log('detail pressed');
      populateDetail(elem);
      openDialog(detailDialog);
    });
  }

  // Adds a 'click' listener that toggles style for completed task
  function addCheckedListener(elem) {
    elem.addEventListener('click', function (e) {
      elem.parentNode.parentNode.classList.toggle('todoChecked');
      let todo = elem.parentNode.parentNode.todoObj;
      if (todo.checked) {
        todo.checked = false;
      } else {
        todo.checked = true;
      }
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

  // Converts a date to output format for todoElem
  function convertDate(date) {
    var newDate = format(parseISO(date), 'MMM d');

    return newDate;
  }

  // Fills the detail dialog box with info from the selected todo
  function populateDetail(button) {
    let todoElem = button.parentNode.parentNode.parentNode;
    console.log(todoElem);
    detailTitle.textContent = todoElem.todoObj.title;

    if (todoElem.todoObj.project === 'home') {
      detailProjectTitle.textContent = 'None';
    } else {
      detailProjectTitle.textContent = todoElem.todoObj.project;
    }
    detailDescription.textContent = todoElem.todoObj.description;
    detailDate.textContent = format(
      parseISO(todoElem.todoObj.dueDate),
      'MMMM d, yyyy'
    );

    if (todoElem.todoObj.priority === 'Low') {
      detailPriority.classList.add('prioLow');
      detailPriority.textContent = 'Low';
    } else if (todoElem.todoObj.priority === 'Mid') {
      detailPriority.classList.add('prioMid');
      detailPriority.textContent = 'Mid';
    } else if (todoElem.todoObj.priority === 'High') {
      detailPriority.classList.add('prioHigh');
      detailPriority.textContent = 'High';
    }
  }

  // Disables a button
  function disableButton(button) {
    button.disabled = true;
  }

  // Enables a button
  function enableButton(button) {
    if (button.tagName === 'BUTTON') {
      button.disabled = false;
    }
  }

  // Enables every button in a nodelist except for the param
  function enableButtonList(button, list) {
    list.forEach(function (currentValue) {
      if (currentValue != button && currentValue.tagName === 'BUTTON') {
        enableButton(currentValue);
      }
    });
  }

  // Removes the 'selected' class from every element in a nodelist
  function removeSelected(list) {
    list.forEach(function (currentValue) {
      if (currentValue.tagName === 'BUTTON') {
        currentValue.classList.remove('selected');
      }
    });
  }

  return {
    renderToDos,
    openDialog,
    closeDialog,
    clearInput,
    clearDetail,
    createTodoElem,
    createProjectElem,
    renderProjectTodos,
    disableButton,
    enableButton,
    enableButtonList,
    removeSelected,
  };
})();

export const todoManager = (function () {
  // Linked list of nodes containing todo objects
  let linkedList = { head: null };

  // Linked list of nodes containing project objects
  let projectLinkedList = { head: null };

  // Current project flag
  let currentProject = 'home';

  // to-do constructor
  function todo(title, description, dueDate, priority, project) {
    this.title = title;
    this.description = description;
    this.dueDate = dueDate;
    this.priority = priority;
    this.project = project;
    this.checked = false;
  }

  // Project constructor
  function project(title) {
    this.title = title;
  }

  // Class definition of todo container nodes
  class listNode {
    constructor(todo) {
      this.todo = todo;
      this.next = null;
    }
  }

  // Class definition of project container nodes
  class projectNode {
    constructor(project) {
      this.project = project;
      this.next = null;
    }
  }

  // Returns the current project
  function getCurrentProject() {
    return currentProject;
  }

  // Takes a string, sets the current project to the new selection
  function setCurrentProject(newProject) {
    currentProject = newProject;
  }

  function checkTodayProjectCondition(todo) {
    if (compareDateToToday(todo.dueDate) != 0) {
      return false;
    } else {
      return true;
    }
  }

  // Creates a new node that contains a todo object, sets it to head if null,
  // calls insert function otherwise
  function createNewNode(todo) {
    let node = new listNode(todo);
    if (linkedList.head === null) {
      linkedList.head = node;
      if (
        getCurrentProject() != 'day' ||
        (getCurrentProject() === 'day' && checkTodayProjectCondition(todo))
      ) {
        displayController.createTodoElem(todo);
      }
    } else {
      insertNode(node);
    }
  }

  // Creates a new node that contains a project, sets it to head if null,
  // calls insert function otherwise
  function createNewProjectNode(project) {
    let node = new projectNode(project);
    if (projectLinkedList.head === null) {
      projectLinkedList.head = node;
    } else {
      insertProjectNode(node);
    }
  }

  // Inserts a node into the linked list of projects
  function insertProjectNode(newNode) {
    let node = projectLinkedList.head;
    while (node != null) {
      console.log('loop');
      if (node.next === null) {
        node.next = newNode;
        break;
      }
      node = node.next;
    }
  }

  // Checks for a duplicate project title in the list
  function checkProjectDupe(project) {
    let node = projectLinkedList.head;
    let lowerTitle = project.title.toLowerCase();

    if (
      lowerTitle === 'home' ||
      lowerTitle === 'day' ||
      lowerTitle === 'week' ||
      lowerTitle === 'overdue'
    ) {
      return true;
    }
    while (node != null) {
      if (node.project.title.toLowerCase() === lowerTitle) {
        return true;
      }
      node = node.next;
    }
    return false;
  }

  // Sorts and inserts a new todo node into the linked list
  function insertNode(newNode) {
    let node = linkedList.head;
    let prevNode;

    while (node != null) {
      // New node has an earlier due date
      if (
        todoManager.compareDates(newNode.todo.dueDate, node.todo.dueDate) === -1
      ) {
        console.log('earlier due date');
        if (node === linkedList.head) {
          linkedList.head = newNode;
        } else {
          prevNode.next = newNode;
        }
        newNode.next = node;
        break;
      }

      // Nodes have the same due date
      else if (
        todoManager.compareDates(newNode.todo.dueDate, node.todo.dueDate) === 0
      ) {
        console.log('same due date');
        // new todo is higher priority
        if (
          (newNode.todo.priority === 'High' && node.todo.priority != 'High') ||
          (newNode.todo.priority === 'Mid' && node.todo.priority === 'Low')
        ) {
          newNode.next = node;
          if (node === linkedList.head) {
            linkedList.head = newNode;
            break;
          } else {
            prevNode.next = newNode;
            break;
          }
        } else if (node.next === null) {
          node.next = newNode;
          break;
        }

        // old todo is higher priority
        else if (
          (node.todo.priority === 'High' &&
            newNode.todo.priority === 'Mid' &&
            node.next.todo.priority != 'High') ||
          (node.todo.priority === 'High' &&
            newNode.todo.priority === 'Low' &&
            node.next.todo.priority === 'Low') ||
          (node.todo.priority === 'Mid' &&
            newNode.todo.priority === 'Low' &&
            node.next.todo.priority === 'Low') ||
          (node.todo.priority === 'Mid' &&
            newNode.todo.priority === 'Low' &&
            node.next.todo.priority === 'Low') ||
          todoManager.compareDates(
            newNode.todo.dueDate,
            node.next.todo.dueDate
          ) === -1
        ) {
          console.log('same due date, old is higher prio');
          newNode.next = node.next;
          node.next = newNode;
          break;
        }
      }

      // New node has later due date and end of list
      else if (node.next === null) {
        console.log('later due date, end of list');
        node.next = newNode;
        break;
      }

      // New node has later due date
      else if (
        todoManager.compareDates(newNode.todo.dueDate, node.todo.dueDate) ===
          1 &&
        todoManager.compareDates(
          newNode.todo.dueDate,
          node.next.todo.dueDate
        ) === -1
      ) {
        console.log('later due date');
        newNode.next = node.next;
        node.next = newNode;
        break;
      }
      prevNode = node;
      node = node.next;
    }
  }

  // Takes a todo object, deletes the node that contains it from the linked list
  function deleteTodoNode(todo) {
    let node = linkedList.head;
    let prevNode;
    if (node === null) {
      console.log('delete error, head null');
      return;
    }
    while (node != null) {
      if (node.todo === todo) {
        if (node === linkedList.head) {
          linkedList.head = node.next;
        } else {
          prevNode.next = node.next;
        }
        break;
      }
      prevNode = node;
      node = node.next;
    }
  }

  // Passes the linked list the the DOM render function
  function renderList() {
    displayController.renderToDos(linkedList);
  }

  function renderProjectList() {
    displayController.renderProjectTodos(linkedList, currentProject);
  }

  // Compares two dates. Returns 1 if the first date is first, 0 if the same,
  // -1 if first date is second
  function compareDates(date1, date2) {
    return compareAsc(parseISO(date1), parseISO(date2));
  }

  // Today's date
  var date = new Date();
  var today = format(date, 'yyyy-MM-dd');

  // Date
  const formDate = document.getElementById('date');
  // Sets min value of form date to today
  formDate.min = today;

  // Compares a date to today's date. Returns 1 if the first date is first,
  // 0 if the same, -1 if first date is second.
  function compareDateToToday(date) {
    return compareAsc(parseISO(date), parseISO(today));
  }

  // Checks if a given date is within a week from today
  function withinWeek(date) {
    if (
      isEqual(parseISO(date), parseISO(today)) ||
      (isAfter(parseISO(date), parseISO(today)) &&
        isBefore(parseISO(date), add(parseISO(today), { days: 7 })))
    ) {
      return true;
    }
    return false;
  }

  // Checks if a given date is prior to today's
  function isOverdue(date) {
    if (isBefore(parseISO(date), parseISO(today))) {
      return true;
    } else {
      return false;
    }
  }

  return {
    todo,
    project,
    createNewNode,
    createNewProjectNode,
    deleteTodoNode,
    renderList,
    renderProjectList,
    getCurrentProject,
    setCurrentProject,
    compareDates,
    compareDateToToday,
    checkTodayProjectCondition,
    withinWeek,
    isOverdue,
    checkProjectDupe,
  };
})();
