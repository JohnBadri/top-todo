export const preventFormSubmission = () => {
  const form = document.querySelector("form");

  form.addEventListener("submit", (submitEvent) => {
    submitEvent.preventDefault();
  });
};
