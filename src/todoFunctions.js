import { format, parseISO, compareAsc } from 'date-fns';

// Detail display title
const detailTitle = document.querySelector('#titleDisplay');
// Detail display details
const detailDescription = document.querySelector('#descriptionDisplay');
// Detail display due date
const detailDate = document.getElementById('dateDisplay');
// Detail priority display
const detailPriority = document.getElementById('prioDisplay');
const todoContainer = document.getElementById('list-container');

export const displayController = (function () {
  // Clears all todo's from the DOM
  function clearTodos() {
    while (todoContainer.firstChild) {
      todoContainer.removeChild(todoContainer.lastChild);
    }
  }

  // Renders todo elements from a linked list
  function renderToDos(linkedList) {
    console.log('renderToDos');
    clearTodos();
    let node = linkedList.head;
    while (node != null) {
      createTodoElem(node.todo);
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
    detailDescription.textContent = '';
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

  // Converts a date to output format
  function convertDate(date) {
    var newDate = format(parseISO(date), 'MMM d');

    return newDate;
  }

  // Fills the detail box with info from the selected todo
  function populateDetail(button) {
    let todoElem = button.parentNode.parentNode.parentNode;
    console.log(todoElem);
    detailTitle.textContent = todoElem.todoObj.title;
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

  return {
    renderToDos,
    openDialog,
    closeDialog,
    clearInput,
    clearDetail,
    createTodoElem, // maybe delete this
  };
})();

export const todoManager = (function () {
  let linkedList = { head: null };

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

  class listNode {
    constructor(todo) {
      this.todo = todo;
      this.next = null;
    }
  }

  function createNewNode(todo) {
    var node = new listNode(todo);
    if (linkedList.head === null) {
      linkedList.head = node;
      displayController.createTodoElem(todo);
    } else {
      insertNode(node);
    }
  }

  function insertNode(newNode) {
    let node = linkedList.head;
    let prevNode;

    while (node != null) {
      // New node has an earlier due date
      if (
        compareAsc(
          parseISO(newNode.todo.dueDate),
          parseISO(node.todo.dueDate)
        ) === -1
      ) {
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
        compareAsc(
          parseISO(newNode.todo.dueDate),
          parseISO(node.todo.dueDate)
        ) === 0
      ) {
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
          compareAsc(
            parseISO(newNode.todo.dueDate),
            parseISO(node.next.todo.dueDate)
          ) === -1
        ) {
          console.log('made it here');
          newNode.next = node.next;
          node.next = newNode;
          break;
        }
      }

      // New node has later due date and end of list
      else if (node.next === null) {
        console.log('made it further');
        node.next = newNode;
        break;
      }

      // New node has later due date
      else if (
        compareAsc(
          parseISO(newNode.todo.dueDate),
          parseISO(node.todo.dueDate)
        ) === 1 &&
        compareAsc(
          parseISO(newNode.todo.dueDate),
          parseISO(node.next.todo.dueDate)
        ) === -1
      ) {
        console.log('made it even further');
        newNode.next = node.next;
        node.next = newNode;
        break;
      }
      prevNode = node;
      node = node.next;
    }
  }

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

  function renderList() {
    displayController.renderToDos(linkedList);
  }

  return { todo, project, createNewNode, deleteTodoNode, renderList };
})();
