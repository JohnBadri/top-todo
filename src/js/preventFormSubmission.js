export const preventFormSubmission = () => {
  const project = document.querySelector(".project-form");
  const list = document.querySelector(".add-list-item");

  project.addEventListener("submit", (submitEvent) => {
    submitEvent.preventDefault();
  });

  list.addEventListener("submit", (submitEvent) => {
    submitEvent.preventDefault();
  });
};
