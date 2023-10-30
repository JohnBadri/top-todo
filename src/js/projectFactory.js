// array to store all the projects
const allProjects = [];

// factory function to create projects
const createProject = (projectName) => {
  const name = projectName;
  let todo = [];
  return {
    name,
    addList(listName) {
      listName = listName.trim();
      const listIndex = todo.findIndex((element) => element === listName);
      if (listIndex === -1) {
        todo.push(listName);
      }
    },
    removeList(listName) {
      const listIndex = todo.findIndex((element) => element === listName);
      if (listIndex !== -1) {
        todo.splice(listIndex, 1);
      }
    },
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
  addDeleteButton.classList.add("input");
  projectItem.appendChild(addDeleteButton);

  addDeleteButton.addEventListener("click", function () {
    const parentProject = addDeleteButton.closest("div");
    const siblingName = addDeleteButton.previousElementSibling;

    const findProject = allProjects.find(
      (element) => element.name === siblingName.textContent
    );
    const findProjectIndex = allProjects.indexOf(siblingName.textContent);
    allProjects.splice(findProjectIndex, 1);
    parentProject.remove();
  });
};

// the function in which renders the project input
export const projectListRender = () => {
  const projectFormInput = document.querySelector(".project-form-name");
  const projectFormSubmit = document.querySelector(".project-form-submit");

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
    console.log(allProjects);
  });
};
