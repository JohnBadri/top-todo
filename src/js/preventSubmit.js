export const preventSubmit = () => {
  const form = document.querySelector("form");

  form.addEventListener("submit", (submit) => {
    submit.preventDefault();
  });
};
