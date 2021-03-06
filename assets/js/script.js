//Variable Declarations
var tasksToDoEl = document.querySelector("#tasks-to-do");
var formEl = document.querySelector("#task-form");
var taskIdCounter = 0;
var pageContentEl = document.querySelector("#page-content");
var tasksInProgressEl = document.querySelector("#tasks-in-progress");
var tasksCompletedEl = document.querySelector("#tasks-completed");
var tasks = [];

//Functions

var taskFormHandler = function(event) {
    event.preventDefault();
    var taskNameInput = document.querySelector("input[name='task-name']").value;
    var taskTypeInput = document.querySelector("select[name='task-type']").value;
  
    // check if inputs are empty (validate)
    if (taskNameInput === "" || taskTypeInput === "") {
      alert("You need to fill out the task form!");
      return false;
    }
  
    // reset form fields for next task to be entered
    document.querySelector("input[name='task-name']").value = "";
    document.querySelector("select[name='task-type']").selectedIndex = 0;
  
    // check if task is new or one being edited by seeing if it has a data-task-id attribute
    var isEdit = formEl.hasAttribute("data-task-id");
  
    if (isEdit) {
      var taskId = formEl.getAttribute("data-task-id");
      completeEditTask(taskNameInput, taskTypeInput, taskId);
    } else {
      var taskDataObj = {
        name: taskNameInput,
        type: taskTypeInput,
        status: "to do"
      };
  
      createTaskEl(taskDataObj);
    }
  };


var completeEditTask = function (taskName, taskType, taskId) {
    // find the matching task list item
    var taskSelected = document.querySelector(
      ".task-item[data-task-id='" + taskId + "']"
    );

    //set new values
    taskSelected.querySelector("h3.task-name").textContent = taskName;
    taskSelected.querySelector("span.task-type").textContent = taskType;

    // loop through tasks array and task object with new content
    for (var i = 0; i < tasks.length; i++) {
        if (tasks[i].id === parseInt(taskId)) {
            tasks[i].name = taskName;
            tasks[i].type = taskType;
        }
    }

    saveTasks();

    alert("Task Updated!");

    //reset form
    formEl.removeAttribute("data-task-id");
    document.querySelector("#save-task").textContent = "Add Task";
  }

  var createTaskEl = function(taskDataObj) {
    var listItemEl = document.createElement("li");
    listItemEl.className = "task-item";
    listItemEl.setAttribute("data-task-id", taskIdCounter);
  
    var taskInfoEl = document.createElement("div");
    taskInfoEl.className = "task-info";
    taskInfoEl.innerHTML = "<h3 class='task-name'>" + taskDataObj.name + "</h3><span class='task-type'>" + taskDataObj.type + "</span>";
    listItemEl.appendChild(taskInfoEl);
  
    // create task actions (buttons and select) for task
    var taskActionsEl = createTaskActions(taskIdCounter);
    listItemEl.appendChild(taskActionsEl);
    tasksToDoEl.appendChild(listItemEl);

    switch (taskDataObj.status) {
        case "to do":
          taskActionsEl.querySelector("select[name='status-change']").selectedIndex = 0;
          tasksToDoEl.append(listItemEl);
          break;
        case "in progress":
          taskActionsEl.querySelector("select[name='status-change']").selectedIndex = 1;
          tasksInProgressEl.append(listItemEl);
          break;
        case "completed":
          taskActionsEl.querySelector("select[name='status-change']").selectedIndex = 2;
          tasksCompletedEl.append(listItemEl);
          break;
        default:
          console.log("Something went wrong!");
      }

    taskDataObj.id = taskIdCounter;
    tasks.push(taskDataObj);

    saveTasks();
  
    // increase task counter for next unique id
    taskIdCounter++;
  };

var createTaskActions = function (taskId) {
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
  deleteButtonEl.setAttribute("data-task-id", taskId);

  actionContainterEl.appendChild(deleteButtonEl);

  var statusSelectEl = document.createElement("select");
  statusSelectEl.className = "select-status";
  statusSelectEl.setAttribute("name", "status-change");
  statusSelectEl.setAttribute("data-task-id", taskId);
  var statusChoices = ["To Do", "In Progress", "Completed"];

  for (var i = 0; i < statusChoices.length; i++) {
    //create option element
    var statusOptionEl = document.createElement("option");
    statusOptionEl.textContent = statusChoices[i];
    statusOptionEl.setAttribute("value", statusChoices[i]);

    //append to select
    statusSelectEl.appendChild(statusOptionEl);
  }

  actionContainterEl.appendChild(statusSelectEl);

  return actionContainterEl;
};

var taskButtonHandler = function (event) {
  // get target element from event
  var targetEl = event.target;

  // edit button was clicked
  if (targetEl.matches(".edit-btn")) {
    var taskId = targetEl.getAttribute("data-task-id");
    editTask(taskId);
  }
  // delete button was clicked
  else if (targetEl.matches(".delete-btn")) {
    var taskId = targetEl.getAttribute("data-task-id");
    deleteTask(taskId);
  }
};

var editTask = function (taskId) {
  // get task list item element
  var taskSelected = document.querySelector(
    ".task-item[data-task-id='" + taskId + "']"
  );

  // get content from task name and type
  var taskName = taskSelected.querySelector("h3.task-name").textContent;

  var taskType = taskSelected.querySelector("span.task-type").textContent;

  document.querySelector("input[name='task-name']").value = taskName;
  document.querySelector("select[name='task-type']").value = taskType;
  document.querySelector("#save-task").textContent = "Save Task";
  //add taskId to the attribute on the form itself
  formEl.setAttribute("data-task-id", taskId);
};

var deleteTask = function (taskId) {
  var taskSelected = document.querySelector(
    ".task-item[data-task-id='" + taskId + "']"
  );
  taskSelected.remove();

  //create a new array to hold updated list of tasks
  var updateTaskArr = [];

  //loop through current tasks
  for(var i = 0; i < tasks.length; i++) {
      //if tasks[i].id doesn't match the value of taskId, keep task
      if(tasks[i].id !== parseInt(taskId)) {
          updateTaskArr.push(tasks[i]);
      }
  }

  tasks = updateTaskArr;

  saveTasks();
}

var taskStatusChangeHandler = function (event) {
  // get the task item's id
  var taskId = event.target.getAttribute("data-task-id");

  // get the currently selected option's value and convert to lowercase
  var statusValue = event.target.value.toLowerCase();

  // find the parent task item element based on the id
  var taskSelected = document.querySelector(
    ".task-item[data-task-id='" + taskId + "']"
  );

  if (statusValue === "to do") {
    tasksToDoEl.appendChild(taskSelected);
  } else if (statusValue === "in progress") {
    tasksInProgressEl.appendChild(taskSelected);
  } else if (statusValue === "completed") {
    tasksCompletedEl.appendChild(taskSelected);
  }
  //update tasks in tasks array
  for (var i = 0; i < tasks.length; i++) {
      if(tasks[i].id === parseInt(taskId)) {
          tasks[i].status = statusValue;
      }
  }

  saveTasks();
};

var saveTasks = function() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

var loadTasks = function() {
    var savedTasks = localStorage.getItem("tasks");

    if(!savedTasks) {
        return false;
    }
    console.log("Found Saved Tasks!")

    savedTasks = JSON.parse(savedTasks);

    //loop through savedTasks array
    for(var i = 0; i < savedTasks.length; i++) {
        //pass each task object into the `createTaskEl()` function
        createTaskEl(savedTasks[i]);
    }

    // for(var i = 0; i < tasks.length; i++) {
    //     taskIdCounter = tasks[i].id;
    //     var listItemEl = document.createElement("li");
    //     listItemEl.className = "task-item";
    //     listItemEl.setAttribute("data-task-id", tasks[i].id);
        

    //     var taskInfoEl = document.createElement("div");
    //     taskInfoEl.className = "task-info";
    //     taskInfoEl.innerHTML = "<h3 class='task-name'>" + tasks[i].name + "</h3><span class='task-type'>" + tasks[i].type + "</span>";
    //     listItemEl.appendChild(taskInfoEl);

    //     var taskActionsEl = createTaskActions(tasks[i].id);
    //     listItemEl.appendChild(taskActionsEl);

    //     if(tasks[i].status === "to do") {
    //         listItemEl.querySelector("select[name='status-change']").selectedIndex = 0;
    //         tasksToDoEl.appendChild(listItemEl);
    //     }
    //     else if (tasks[i].status === "in progress") {
    //         listItemEl.querySelector("select[name='status-change']").selectedIndex = 1;
    //         tasksInProgressEl.appendChild(listItemEl);
    //     }
    //     else if (tasks[i].status === "completed") {
    //         listItemEl.querySelector("select[name='status-change']").selectedIndex = 2;
    //         tasksCompletedEl.appendChild(listItemEl);
    //     }
    //     taskIdCounter++;
    //     console.log(listItemEl);
    //}

    

}


formEl.addEventListener("submit", taskFormHandler);
pageContentEl.addEventListener("click", taskButtonHandler);
pageContentEl.addEventListener("change", taskStatusChangeHandler);

loadTasks();
