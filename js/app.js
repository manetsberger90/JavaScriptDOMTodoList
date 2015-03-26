//Problem: User Interaction doesn't provide desired results.
//Solution: Add Interactivity so the user can manage daily tasks.
//Reminder: Reference Mozilla MDN for DOM manipulation.
var taskInput = document.getElementById("new-task"); //new-task
var addButton = document.getElementsByTagName("button")[0]; //first button
var incompleteTasksHolder = document.getElementById("incomplete-tasks"); 
var completeTasksHolder = document.getElementById("completed-tasks"); 


//New Task List Item
var createNewTaskElement = function(taskString) {
   //create list item.
    var listItem = document.createElement("li");
    //input (checkbox)
    var checkBox = document.createElement("input");
     //label
    var label = document.createElement("label");
     //input (text)
    var editInput = document.createElement("input");
     //button.edit
    var editButton = document.createElement("button");
     //button.delete
    var deleteButton = document.createElement("button");
    
     //Each Element Needs To Be Modified.
    checkBox.type = "checkbox";
    editInput.type = "text";
    
    editButton.innerText = "Edit";
    editButton.className = "edit";
    deleteButton.innerText = "Delete";
    deleteButton.className = "delete";
    label.innerText = taskString;

    //Each Element Needs Appending.
    listItem.appendChild(checkBox);
    listItem.appendChild(label);
    listItem.appendChild(editInput);
    listItem.appendChild(editButton);
    listItem.appendChild(deleteButton);
    
    return listItem;
}


//Add new Task
var addTask = function() {
    console.log("Add Task...");
  //Create a new list item with the text from the #new-task:
var listItem = createNewTaskElement(taskInput.value);
    
    //Append listItem to incompleteTasksHolder
    incompleteTasksHolder.appendChild(listItem);
     bindTaskEvents(listItem, taskCompleted);
    
    taskInput.value = "";
}



//Edit existing task.
var editTask = function() {
    console.log("Edit Task...");
    var listItem = this.parentNode;
    
    var editInput = listItem.querySelector("input[type=text");
    
    var label = listItem.querySelector("label");
    
    var containsClass = listItem.classList.contains("editMode");
//When the edit button is pressed
    if(containsClass) {
    
  //If the class of the parent is .editMode 
     //switch from .editMode
     //label text with input's value.
     label.innerText = editInput.value;   
    } else {
    //else
      //Switch to .editMode
      //input value becomes the label's text.
        editInput.value = label.innerText;
    }
    //Toggle .editMode
    listItem.classList.toggle("editMode");
}




//Delete and existing task.
 var deleteTask = function() {
     console.log("Delete Task...");
     var listItem = this.parentNode;
     var ul = listItem.parentNode;
     ul.removeChild(listItem);
 }

//Mark a Task as complete.
 var taskCompleted = function() {
     console.log("Complete Task...");
 //When the checkbox is checked.
     var listItem = this.parentNode;
     //Append the task list item to the #completed-task
     completeTasksHolder.appendChild(listItem);
     bindTaskEvents(listItem, taskIncompleted);
 }
//Mark a task as incomplete.
 var taskIncompleted = function() {
     console.log("Incomplete Task...");
   //When the checkbox is unchecked.
     var listItem = this.parentNode;
     //Append to the list item to #incomplete-task.
     incompleteTasksHolder.appendChild(listItem);
      bindTaskEvents(listItem, taskCompleted);
    
 }
 
 var bindTaskEvents = function(taskListItem, checkBoxEventHandler) {
     console.log("Bind list item events"); 
   //Select taskListItems children.
     var checkbox = taskListItem.querySelector("input[type=checkbox]");
     var editButton = taskListItem.querySelector("button.edit");
     var deleteButton = taskListItem.querySelector("button.delete");
     //Bind editTask to edit button.
     editButton.onclick = editTask;
     //Bind deleteTask to delete button.
     deleteButton.onclick = deleteTask;
     //Bind taskCompleted to checkbox
     checkbox.onchange = checkBoxEventHandler;
 }
 
 //Set the Click Handler to the addTask function
//    addButton.onclick = addTask;

var ajaxRequest = function() {
    console.log("AJAX Request");
}
addButton.addEventListener("click", addTask);
addButton.addEventListener("click", ajaxRequest);

//Cycle over the incompleteTasksHolder ul list items\
for (var i = 0; i < incompleteTasksHolder.children.length; i++) {   
  // For Each list item
     //Bind events to list item's children (taskCompleted)
    bindTaskEvents(incompleteTasksHolder.children[i], taskCompleted);
}

//Cycle over the completeTasksHolder ul list items
for (var i = 0; i < completeTasksHolder.children.length; i++) {   
  // For Each list item
     //Bind events to list item's children (taskCompleted)
    bindTaskEvents(completeTasksHolder.children[i], taskIncompleted);
}
