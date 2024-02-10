export const displayController = (function () {
  function renderToDos() {
    console.log('renderToDos');
  }

  // Enables form and overlay
  function formOn(form) {
    form.style.display = 'block';
    overlayOn();
  }

  // Disables form and overlay
  function formOff(form) {
    form.style.display = 'none';
    overlayOff();
  }

  // Enables overlay
  function overlayOn() {
    ovrly.style.display = 'block';
  }

  // Disables overlay
  function overlayOff() {
    ovrly.style.display = 'none';
  }

  // Clears form input, takes nodelist param
  function clearInput(inputFields) {
    if (inputFields.length === 0) {
      return;
    }

    inputFields.forEach(function (currentValue) {
      currentValue.value = '';
    });
  }

  return { renderToDos, formOn, formOff, clearInput };
})();
