let todoInput = document.getElementById("todo_input");
let bgImg = document.getElementById("bgImg");
let body = document.getElementById("body");
let todoBox = document.getElementById("todoBox");
let toggle = document.getElementById("toggle");

document.getElementById("toggle").addEventListener("click", function () {
  var img = document.getElementById("toggle");
  if (img.src.endsWith("icon-moon.svg")) {
    img.src = "./images/icon-sun.svg";

    bgImg.src = "./images/bg-desktop-dark.jpg";
    body.style.background = "hsl(235, 21%, 11%)";
    body.style.color = "white";
    todoInput.style.background = "hsl(235, 24%, 19%)";
    todoInput.style.color = "#fff";
    todoBox.style.background = "hsl(235, 24%, 19%)";

    if (window.innerWidth < 550) {
      bgImg.src = "./images/bg-mobile-dark.jpg";
    } else {
      bgImg.src = "./images/bg-desktop-dark.jpg";
    }
  } else {
    img.src = "./images/icon-moon.svg";

    bgImg.src = "./images/bg-desktop-light.jpg";
    body.style.background = "#fff";
    body.style.color = "#000";
    todoInput.style.background = "#fff";
    todoInput.style.color = "#000";
    todoBox.style.background = "#fff";

    if (window.innerWidth < 550) {
      bgImg.src = "./images/bg-mobile-light.jpg";
    } else {
      bgImg.src = "./images/bg-desktop-light.jpg";
    }
  }
});
console.log("clicked");

//

window.addEventListener("resize", function () {
  if (window.innerWidth < 550) {
    bgImg.src = "./images/bg-mobile-light.jpg";
  } else {
    bgImg.src = "./images/bg-desktop-light.jpg";
  }
});

let activeTodosCount = 0; // Variable to keep track of active todos

function updateActiveTodosCount() {
  activeTodosCount = document.querySelectorAll(
    "#listCont li:not(.deleted)"
  ).length;
  document.getElementById("no").textContent = activeTodosCount;
}

let ul = document.getElementById("listCont");

// Add event listeners for dragula events

todoInput.addEventListener("keydown", function (event) {
  if (event.key === "Enter") {
    event.preventDefault();
    addNewTodo();
  }
});

function addNewTodo() {
  var li = document.createElement("li"); // Change to 'li' element
  var node = document.createTextNode(todoInput.value);
  li.appendChild(node);
  li.style.padding = "14px";
  li.style.border = "1px solid hsla(237, 14%, 26%, 0.3)";
  li.style.borderLeft = "0";
  li.style.borderRight = "0";
  li.style.width = "100%";
  li.style.paddingRight = "50px";
  li.style.cursor = "pointer";
  li.style.fontSize = "14px";

  var icon = document.createElement("span");
  icon.innerHTML =
    '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20"><circle cx="10" cy="10" r="9" stroke="hsl(233, 11%, 84%)" fill="none" stroke-width="2" /></svg>';
  icon.style.marginRight = "5px";
  icon.style.display = "inline-block";
  icon.style.width = "20px";
  icon.style.height = "20px";
  icon.style.verticalAlign = "middle";

  let isSelected = false;
  li.addEventListener("click", () => {
    isSelected = !isSelected;

    if (isSelected) {
      updateActiveTodosCount();
      li.style.color = " hsl(236, 9%, 61%)";
      li.classList.add("selected");
      li.style.textDecoration = "line-through";
      icon.innerHTML =
        '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20">' +
        "<defs>" +
        '<linearGradient id="bgGradient" x1="0%" y1="0%" x2="100%" y2="0%">' +
        '<stop offset="0%" style="stop-color:hsl(192, 100%, 67%)" />' +
        '<stop offset="100%" style="stop-color:hsl(280, 87%, 65%)" />' +
        "</linearGradient>" +
        "</defs>" +
        '<circle cx="10" cy="10" r="9" fill="url(#bgGradient)" stroke="hsl(233, 11%, 84%)" stroke-width="2" />' +
        '<path d="M6 10 l2 2 4-4" fill="none" stroke="white" stroke-width="2" />' +
        "</svg>";
    } else {
      updateActiveTodosCount();
      li.classList.remove("selected");
      li.style.textDecoration = "none";
      li.style.color = "inherit";
      icon.innerHTML =
        '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20"><circle cx="10" cy="10" r="9" fill="none" stroke="hsl(233, 11%, 84%)" stroke-width="2" /></svg>';
    }
  });
  let deleteButton = document.createElement("button");

  deleteButton.innerHTML = '<img src="./images/icon-cross.svg" alt="delete" />';
  deleteButton.style.border = "none";
  deleteButton.style.position = "absolute"; // Set delete button to absolute position
  deleteButton.style.right = "12px"; // Adjust the right position
  deleteButton.style.color = "white";
  deleteButton.style.fontSize = "1em";
  deleteButton.style.cursor = "pointer";
  deleteButton.style.background = "#ffffff00";

  // Add event listener to delete button
  deleteButton.addEventListener("click", function () {
    ul.removeChild(li);
  });

  let clearCompleted = document.getElementById("clear-completed");
  clearCompleted.addEventListener("click", function () {
    let todos = document.querySelectorAll("li");
    updateActiveTodosCount();

    todos.forEach(function (todo) {
      if (todo.classList.contains("selected")) {
        todo.remove();
      }
    });
  });

  let activeTodos = document.getElementById("active");
  activeTodos.addEventListener("click", () => {
    activeTodos.style.color = "hsl(220, 98%, 61%)";
    completedTodos.style.color = " hsl(236, 9%, 61%)";
    allTodos.style.color = " hsl(236, 9%, 61%)";
    let todos = document.querySelectorAll("li");
    todos.forEach(function (todo) {
      if (todo.classList.contains("selected")) {
        todo.style.display = "none";
      }
    });
  });

  let allTodos = document.getElementById("all");

  document.getElementById("all").addEventListener("click", function () {
    activeTodos.style.color = " hsl(236, 9%, 61%)";
    completedTodos.style.color = " hsl(236, 9%, 61%)";
    allTodos.style.color = "hsl(220, 98%, 61%)";
    document.querySelectorAll("#listCont li").forEach((li) => {
      li.style.display = "block";
    });
  });

  let completedTodos = document.getElementById("completed");
  completedTodos.addEventListener("click", () => {
    activeTodos.style.color = " hsl(236, 9%, 61%)";
    completedTodos.style.color = "hsl(220, 98%, 61%)";
    allTodos.style.color = " hsl(236, 9%, 61%)";
    let todos = document.querySelectorAll("li");
    todos.forEach(function (todo) {
      if (!todo.classList.contains("selected")) {
        todo.style.display = "none";
      }
    });
  });

  li.appendChild(icon);
  li.appendChild(node);
  li.appendChild(deleteButton);

  ul.appendChild(li);

  todoInput.value = "";

  //   li.insertBefore(icon, li.firstChild), del.innerHTML; // Insert the icon as the first child

  li.draggable = true; // Make the new todo draggable

  ul.appendChild(li);
  todoInput.value = "";
  updateActiveTodosCount();
}

const drake = dragula([document.getElementById("listCont")]);
dragula([document.getElementById("listCont")]);

removeOnSpill: false
  .on("drag", function (el) {
    el.className.replace("ex-moved", "");
  })
  .on("drop", function (el) {
    el.className += "ex-moved";
  })
  .on("over", function (el, container) {
    container.className += "ex-over";
  })
  .on("out", function (el, container) {
    container.className.replace("ex-over", "");
  });

//  dynamic count

// dark theme
