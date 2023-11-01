// array to store all the projects
const allProjects = [];

// factory function to create projects
const createProject = (projectName, title, description, dueDate, priority) => {
  const name = projectName;
  let todo = [];
  const addToDo = (title, description, dueDate, priority) => {
    const task = {
      title: title,
      description: description,
      dueDate: dueDate,
      priority: priority,
    };
    todo.push(task);
  };
  return {
    name,
    todo,
    addToDo,
  };
};

// resets the project input
const resetForm = (inputElement, submitElement) => {
  inputElement.value = "";
  submitElement.style.color = "#000";
};

// change the placeholder message if either, the input is empty, or if the project entered is already mentioned as a project
const displayEmptyError = (projectName, inputElement, submitElement) => {
  if (projectName === "") {
    inputElement.placeholder = "Project name cannot empty";
  } else {
    inputElement.value = "";
    inputElement.placeholder = `${projectName} is taken`;
  }
  submitElement.style.color = "#ff0000";
};

// checks the project name being input is in the project object array
const displayDuplicateError = (projectArray, projectName) => {
  const indexCheck = projectArray.findIndex(
    (element) => element.name === projectName
  );

  return indexCheck;
};

const showToDo = (projectItem) => {
  // Remove existing to-dos from the list
  const allToDo = document.querySelectorAll(".list-item");
  allToDo.forEach((item) => {
    item.remove();
  });

  const projectName = projectItem.querySelector("p").textContent;

  const projectObj = allProjects.find(
    (project) => project.name === projectName
  );

  if (projectObj && projectObj.todo.length > 0) {
    projectObj.todo.forEach((task) => {
      createToDo(task.title, task.description, task.dueDate, task.priority);
    });
  }
};

// render the project list item including deleting it
const createElement = (projectName) => {
  const listOfProjects = document.querySelector(".project-list-container");
  const projectItem = document.createElement("div");
  projectItem.classList.add("input", "project-item");
  listOfProjects.appendChild(projectItem);

  const addProjectName = document.createElement("p");
  addProjectName.textContent = projectName;
  projectItem.appendChild(addProjectName);

  const addDeleteButton = document.createElement("button");
  addDeleteButton.textContent = "✘";
  addDeleteButton.classList.add("project-delete-btn");
  projectItem.appendChild(addDeleteButton);

  addDeleteButton.addEventListener("click", function (event) {
    event.stopPropagation();
    const parentProject = addDeleteButton.closest("div");
    const siblingName = addDeleteButton.previousElementSibling;

    const findProjectIndex = allProjects.findIndex(
      (element) => element.name === siblingName.textContent
    );

    const wasActive = parentProject.classList.contains("active");

    if (findProjectIndex !== -1) {
      allProjects.splice(findProjectIndex, 1);
      parentProject.remove();
    }

    if (wasActive && allProjects.length > 0) {
      const firstProjectElement = document.querySelector(".project-item");
      if (firstProjectElement) {
        firstProjectElement.classList.add("active");
        showToDo(firstProjectElement);
      }
    }
  });

  projectItem.addEventListener("click", () => {
    const allProjectItems = document.querySelectorAll(".project-item");
    allProjectItems.forEach((item) => {
      item.classList.remove("active");
    });
    projectItem.classList.add("active");
    showToDo(projectItem);
  });
};

// render the project list item including deleting it
const createToDo = (listTitle, listDescription, listDate, listPriority) => {
  const listOfToDo = document.querySelector(".list-item-container");
  const listItem = document.createElement("div");
  listItem.classList.add("project-todo", "list-item");
  listOfToDo.appendChild(listItem);

  const addListTitle = document.createElement("p");
  addListTitle.textContent = listTitle;
  listItem.appendChild(addListTitle);

  const addListDescription = document.createElement("p");
  addListDescription.textContent = listDescription;
  listItem.appendChild(addListDescription);

  const addListDate = document.createElement("p");
  addListDate.textContent = listDate;
  listItem.appendChild(addListDate);

  const addListPriority = document.createElement("p");
  addListPriority.textContent = listPriority;
  listItem.appendChild(addListPriority);

  const addDeleteButton = document.createElement("button");
  addDeleteButton.textContent = "✘";
  addDeleteButton.classList.add("list-delete-btn");
  listItem.appendChild(addDeleteButton);

  addDeleteButton.addEventListener("click", function () {
    const activeElement = document.querySelector(".active");
    if (activeElement) {
      const activeProjectName = activeElement.querySelector("p").textContent;
      const project = allProjects.find(
        (proj) => proj.name === activeProjectName
      );

      if (project) {
        const taskIndex = project.todo.findIndex(
          (task) => task.title === listTitle
        );
        if (taskIndex !== -1) {
          project.todo.splice(taskIndex, 1);
        }
      }
    }

    listItem.remove();
  });
};

// the function in which renders the project input
export const projectListRender = () => {
  const projectFormInput = document.querySelector(".project-form-name");
  const projectFormSubmit = document.querySelector(".project-form-submit");
  const toDoFormSubmit = document.querySelector(".project-todo-add");

  projectFormSubmit.addEventListener("click", () => {
    const projectName = projectFormInput.value.trim();
    const checkIfProjectExists = displayDuplicateError(
      allProjects,
      projectName
    );

    if (projectName && checkIfProjectExists === -1) {
      const project = createProject(projectName);
      allProjects.push(project);
      createElement(projectName);
      resetForm(projectFormInput, projectFormSubmit);
    } else {
      displayEmptyError(projectName, projectFormInput, projectFormSubmit);
    }
  });

  toDoFormSubmit.addEventListener("click", () => {
    const warning = document.querySelector(".project-warning");
    const toDoText = document.querySelector(".todo-list-text").value.trim();
    const toDoDesc = document.querySelector(".todo-list-desc").value.trim();
    const toDoDate = document.querySelector(".todo-list-date").value;
    const toDoPriority = document.querySelector(".todo-list-option").value;
    const activeElement = document.querySelector(".active");
    const activeProjectdiv = activeElement
      ? activeElement.querySelector("p").textContent
      : null;

    const findProjectIndex = allProjects.findIndex(
      (element) => element.name === activeProjectdiv
    );

    if (
      toDoDate &&
      toDoDesc &&
      toDoDate &&
      toDoPriority &&
      activeProjectdiv !== null
    ) {
      if (findProjectIndex !== -1) {
        allProjects[findProjectIndex].addToDo(
          toDoText,
          toDoDesc,
          toDoDate,
          toDoPriority
        );
        createToDo(toDoText, toDoDesc, toDoDate, toDoPriority);
        warning.style.display = "none";
      }
    } else if (
      toDoDate &&
      toDoDesc &&
      toDoDate &&
      toDoPriority &&
      activeProjectdiv === null
    ) {
      warning.style.display = "block";
    }
  });
};
