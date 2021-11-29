var tasksToDoEl = document.querySelector("#tasks-to-do");
//finds the form element and assigns formEl
var formEl = document.querySelector("#task-form");

var createTaskHandler = function(event) {
    event.preventDefault();

    //create variable that accesses the input of task-name [] = selects an HTML element
    var taskNameInput = document.querySelector("input[name='task-name']").value;
    var taskTypeInput = document.querySelector("select[name='task-type']").value;
    console.dir(taskNameInput);

    //creates the list item
    var listItemEl = document.createElement("li");
    listItemEl.className = "task-item";

    //create div to hold task info and add to the list item
    var taskInfoEl = document.createElement("div");
    //give it a class name
    taskInfoEl.className = "task-info";
    //add HTML content to the div
    taskInfoEl.innerHTML = "<h3 class = 'task-name'>" + taskNameInput + "</h3><span class='task-type'>" + taskTypeInput + "</span>";

    listItemEl.appendChild(taskInfoEl);
    //add entire list item to list
    tasksToDoEl.appendChild(listItemEl);
}

formEl.addEventListener("submit", createTaskHandler);

