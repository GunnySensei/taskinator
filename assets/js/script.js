var tasksToDoEl = document.querySelector("#tasks-to-do");
//finds the form element and assigns formEl
var formEl = document.querySelector("#task-form");
//counter variable
var taskIdCounter = 0;

var taskFormHandler = function(event) {
    event.preventDefault();
    //create variable that accesses the input of task-name [] = selects an HTML element
    var taskNameInput = document.querySelector("input[name='task-name']").value;
    var taskTypeInput = document.querySelector("select[name='task-type']").value;

    //check if input contains empty strings
    if(!taskNameInput || !taskTypeInput) {
        alert("You need to fill out the task form!");
        return false;
    }

    //package data as an object
    var taskDataObj = {
        name: taskNameInput,
        type: taskTypeInput
    };

    //send as an argument to createTaskEl
    createTaskEl(taskDataObj);

    formEl.reset();
}

var createTaskEl = function(taskDataObj) {
    
    //creates the list item
    var listItemEl = document.createElement("li");
    listItemEl.className = "task-item";

    //add task id as a custom attribute
    listItemEl.setAttribute("data-task-id", taskIdCounter);

    //create div to hold task info and add to the list item
    var taskInfoEl = document.createElement("div");
    //give it a class name
    taskInfoEl.className = "task-info";
    //add HTML content to the div
    taskInfoEl.innerHTML = "<h3 class='task-name'>" + taskDataObj.name + "</h3><span class='task-type'>" + taskDataObj.type + "</span>";
    listItemEl.appendChild(taskInfoEl);

    var taskActionsEl = createTaskActions(taskIdCounter);
    listItemEl.appendChild(taskActionsEl);
    //add entire list item to list
    tasksToDoEl.appendChild(listItemEl);


    //increase task counter for id
    taskIdCounter++;


}

var createTaskActions = function(taskId) {
    //create new div element for taskActions
    var actionContainterEl = document.createElement("div");
    actionContainterEl.className = "task-actions";

    //create edit button
    var editButtonEl = document.createElement("button");
    editButtonEl.textContent = "Edit";
    editButtonEl.className = "btn edit-btn";
    editButtonEl.setAttribute("data-task-id", taskId);

    actionContainterEl.appendChild(editButtonEl);

    //create delete button
    var deleteButtonEl = document.createElement("button");
    deleteButtonEl.textContent = "Delete";
    deleteButtonEl.className = "btn delete-btn";
    deleteButtonEl.setAttribute("data-task-id", taskId)

    actionContainterEl.appendChild(deleteButtonEl);

    var statusSelectEl = document.createElement("select");
    statusSelectEl.className = "select-status";
    statusSelectEl.setAttribute("name", "status-change");
    statusSelectEl.setAttribute("data-task-id", taskId);
    var statusChoices = ["To Do", "In Progress", "Completed"];

    for(var i = 0; i < statusChoices.length; i++) {
        //create option element
        var statusOptionEl = document.createElement("option");
        statusOptionEl.textContent = statusChoices[i];
        statusOptionEl.setAttribute("value", statusChoices[i]);

        //append to select
        statusSelectEl.appendChild(statusOptionEl);
    }
    
    actionContainterEl.appendChild(statusSelectEl);

    return actionContainterEl;
}

formEl.addEventListener("submit", taskFormHandler);

