// Document is the DOM can be accessed in the console with document.window.
// Tree is from the top, html, body, p etc.

// Problem: User interaction does not provide the correct results.
// Solution: Add interactivity so the user can manage daily tasks.
// Break things down into smaller steps and take each step at a time.

// Event handling, user interaction is what starts the code execution.

// Issues with usability don't get seen until they are in front of a human tester.

// Prevent creation of empty tasks.

// Change edit to save when you are in edit mode.

const taskInput = document.getElementById('new-task');
const addButton = document.getElementById('add-task-button');
const incompleteTaskHolder = document.getElementById('incomplete-tasks');
const completedTasksHolder = document.getElementById('completed-tasks');

// Create new task list item
function createNewTaskElement(taskString) {
  const listItem = document.createElement('li');
  listItem.classList.add('task');

  const checkBox = document.createElement('input');
  checkBox.type = 'checkbox';
  checkBox.classList.add('task__checkbox');

  const label = document.createElement('label');
  label.innerText = taskString;
  label.classList.add('task__label');

  const editInput = document.createElement('input');
  editInput.type = 'text';
  editInput.classList.add('task__input');

  const editButton = document.createElement('button');
  editButton.innerText = 'Edit';
  editButton.classList.add('task__btn');
  editButton.classList.add('task__btn--edit');

  const deleteButton = document.createElement('button');
  deleteButton.classList.add('task__btn');
  deleteButton.classList.add('task__btn--delete');

  const deleteButtonImg = document.createElement('img');
  deleteButtonImg.src = './remove.svg';
  deleteButtonImg.alt = 'Delete icon';
  deleteButtonImg.classList.add('task__delete-icon');
  deleteButton.appendChild(deleteButtonImg);

  listItem.append(checkBox, label, editInput, editButton, deleteButton);
  return listItem;
}

// Add a new item to the "TODOo" tasks list
function addTask() {
  console.log('Add Task...');

  if (!taskInput.value.trim()) return;

  const listItem = createNewTaskElement(taskInput.value);
  incompleteTaskHolder.appendChild(listItem);
  bindTaskEvents(listItem, completeTask);

  taskInput.value = '';
  toggleButtonState();
}

// Change button state based on the input field value
function toggleButtonState() {
  if (!taskInput.value.trim()) {
    addButton.disabled = true;
    addButton.classList.add('task__btn--disabled');
  } else {
    addButton.disabled = false;
    addButton.classList.remove('task__btn--disabled');
  }
}

taskInput.addEventListener('input', toggleButtonState);
toggleButtonState();

addButton.addEventListener('click', () => {
  addTask();
});

taskInput.addEventListener('keydown', (event) => {
  if (event.key === 'Enter' && taskInput.value.trim()) {
    addTask();
  }
});

// Edit an item in the tasks list
function editTask() {
  console.log('Edit Task...');
  console.log('Change "edit" to "save"');

  const listItem = this.parentNode;
  const editInput = listItem.querySelector('.task__input');
  const label = listItem.querySelector('.task__label');
  const editBtn = listItem.querySelector('.task__btn--edit');
  const containsClass = listItem.classList.contains('task--edit-mode');

  // If class of the parent is .task--edit-mode
  if (containsClass) {
    label.innerText = editInput.value;
    editBtn.innerText = 'Edit';
  } else {
    editInput.value = label.innerText;
    editBtn.innerText = 'Save';
  }

  listItem.classList.toggle('task--edit-mode');
}

// Delete an item from the tasks list
function deleteTask() {
  console.log('Delete Task...');

  const listItem = this.parentNode;
  listItem.parentNode.removeChild(listItem);
}

// Mark an item as "COMPLETED"
function completeTask() {
  console.log('Complete Task...');

  const listItem = this.parentNode;
  completedTasksHolder.appendChild(listItem);
  listItem.classList.add('task--completed');
  bindTaskEvents(listItem, incompleteTask);
}

// Mark an item as incomplete
function incompleteTask() {
  console.log('Incomplete Task...');

  const listItem = this.parentNode;
  incompleteTaskHolder.appendChild(listItem);
  listItem.classList.remove('task--completed');
  bindTaskEvents(listItem, completeTask);
}

// Attached event handlers to the task elements(taskListItem)
function bindTaskEvents(taskListItem, checkBoxEventHandler) {
  console.log('Bind list item events');

  const checkBox = taskListItem.querySelector('.task__checkbox');
  const editButton = taskListItem.querySelector('.task__btn--edit');
  const deleteButton = taskListItem.querySelector('.task__btn--delete');

  editButton.addEventListener('click', editTask);
  deleteButton.addEventListener('click', deleteTask);
  checkBox.addEventListener('change', (event) => {
    checkBoxEventHandler.call(event.target);
  });
}

// Bind event handlers to all tasks in the task holder
function bindAllTasks(taskHolder, handler) {
  for (let i = 0; i < taskHolder.children.length; i += 1) {
    bindTaskEvents(taskHolder.children[i], handler);
  }
}

bindAllTasks(incompleteTaskHolder, completeTask);
bindAllTasks(completedTasksHolder, incompleteTask);
