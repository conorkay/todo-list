import './style.css';

export const displayController = (function () {
  function renderToDos() {
    console.log('renderToDos');
  }
  return { renderToDos };
})();
