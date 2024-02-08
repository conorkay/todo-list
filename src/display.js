export const displayController = (function () {
  function renderToDos() {
    console.log('renderToDos');
  }

  // Enables form and overlay
  function formOn(form) {
    ovrly.style.display = 'block';
    form.style.display = 'block';
  }

  // Disables form and overlay
  function formOff(form) {
    ovrly.style.display = 'none';
    form.style.display = 'none';
  }

  return { renderToDos, formOn, formOff };
})();
