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
  deleteButtonImg.classList.add('task__delete-icon');
  deleteButton.appendChild(deleteButtonImg);

  listItem.append(checkBox, label, editInput, editButton, deleteButton);
  return listItem;
}

// Add a new item to the "TODOo" tasks list
function addTask() {
  console.log('Add Task...');
  if (!taskInput.value) return;
  const listItem = createNewTaskElement(taskInput.value);

  incompleteTaskHolder.appendChild(listItem);
  bindTaskEvents(listItem, taskCompleted);

  taskInput.value = '';
}

addButton.addEventListener('click', () => {
  addTask();
});

// Edit an existing task.
function editTask() {
  console.log('Edit Task...');
  console.log('Change "edit" to "save"');

  const listItem = this.parentNode;
  const editInput = listItem.querySelector('.task__input');
  const label = listItem.querySelector('.task__label');
  const editBtn = listItem.querySelector('.task__btn--edit');
  const containsClass = listItem.classList.contains('task--edit-mode');

  // If class of the parent is task--edit-mode
  if (containsClass) {
    label.innerText = editInput.value;
    editBtn.innerText = 'Edit';
  } else {
    editInput.value = label.innerText;
    editBtn.innerText = 'Save';
  }

  listItem.classList.toggle('task--edit-mode');
}


//Delete task.
var deleteTask=function(){
    console.log("Delete Task...");

    var listItem=this.parentNode;
    var ul=listItem.parentNode;
    //Remove the parent list item from the ul.
    ul.removeChild(listItem);

}


//Mark task completed
var taskCompleted=function(){
    console.log("Complete Task...");

    //Append the task list item to the #completed-tasks
    var listItem=this.parentNode;
    completedTasksHolder.appendChild(listItem);
    bindTaskEvents(listItem, taskIncomplete);

}


var taskIncomplete=function(){
    console.log("Incomplete Task...");
//Mark task as incomplete.
    //When the checkbox is unchecked
    //Append the task list item to the #incompleteTasks.
    var listItem=this.parentNode;
    incompleteTaskHolder.appendChild(listItem);
    bindTaskEvents(listItem,taskCompleted);
}


function bindTaskEvents(taskListItem, checkBoxEventHandler) {
  console.log("bind list item events");
  //select ListItems children
  var checkBox=taskListItem.querySelector("input[type=checkbox]");
  const editButton = taskListItem.querySelector('.task__btn--edit');
  var deleteButton=taskListItem.querySelector("button.delete");

  //Bind editTask to edit button.
  editButton.onclick=editTask;
  //Bind deleteTask to delete button.
  deleteButton.onclick=deleteTask;
  //Bind taskCompleted to checkBoxEventHandler.
  checkBox.onchange=checkBoxEventHandler;
}

//cycle over incompleteTaskHolder ul list items
//for each list item
for (var i=0; i<incompleteTaskHolder.children.length;i++){

    //bind events to list items chldren(tasksCompleted)
    bindTaskEvents(incompleteTaskHolder.children[i],taskCompleted);
}




//cycle over completedTasksHolder ul list items
for (var i=0; i<completedTasksHolder.children.length;i++){
    //bind events to list items chldren(tasksIncompleted)
    bindTaskEvents(completedTasksHolder.children[i],taskIncomplete);
}
