var tasksToDoEl = document.querySelector("#tasks-to-do");
//finds the form element and assigns formEl
var formEl = document.querySelector("#task-form");

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

    //create div to hold task info and add to the list item
    var taskInfoEl = document.createElement("div");
    //give it a class name
    taskInfoEl.className = "task-info";
    //add HTML content to the div
    taskInfoEl.innerHTML = "<h3 class='task-name'>" + taskDataObj.name + "</h3><span class='task-type'>" + taskDataObj.type + "</span>";

    listItemEl.appendChild(taskInfoEl);
    //add entire list item to list
    tasksToDoEl.appendChild(listItemEl);


}

formEl.addEventListener("submit", taskFormHandler);

