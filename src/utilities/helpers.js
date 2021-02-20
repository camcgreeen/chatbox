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

export const generateRandomString = (length) => {
  const chars = "0123456789abcdefghijklmnopqrstuvwxyz";
  let result = "";
  for (let i = length; i > 0; --i)
    result += chars[Math.round(Math.random() * (chars.length - 1))];
  return result;
};
