/* eslint-disable */

export const delayAlert = (message, type) => {
  sessionStorage.setItem('delay-alert-message', message);
  sessionStorage.setItem('delay-alert-type', type);

  // Reload the current page
  window.location.reload();
};

export const hideAlert = (el) => {
  if (el) el.remove();
};

export const showAlert = (message, type) => {
  const alertPlaceholder = document.getElementById('liveAlertPlaceholder');

  const wrapper = document.createElement('div');
  wrapper.innerHTML = [
    `<div class="alert alert-${type} alert-dismissible fade show" role="alert">`,
    `   <div>${message}</div>`,
    '   <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>',
    '</div>',
  ].join('');

  alertPlaceholder.append(wrapper);

  // Close the alert after 5 seconds
  setTimeout(() => {
    hideAlert(wrapper);
  }, 5000);
};

export const validationErrorAlert = (error) => {
  const arrValidationError = error.response.data.validationError;
  arrValidationError.forEach((el) => {
    showAlert(`${error.response.data.message}: <span class='fw-bold'>${el.message}</span>`, 'danger');
  });
};
