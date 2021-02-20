export const disableRightMiddleClick = () => {
  document.addEventListener("contextmenu", (e) => {
    e.preventDefault();
  });
  window.addEventListener("auxclick", (event) => {
    if (event.button === 1) {
      event.preventDefault();
    }
  });
};
