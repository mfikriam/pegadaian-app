/* eslint-disable */
import axios from 'axios';
import { delayAlert, showAlert, validationErrorAlert } from './alert';

export const addNewData = async (modelName, data, form, modal) => {
  try {
    const res = await axios({
      method: 'POST',
      url: `/api/v1/${modelName}`,
      data,
    });

    if (res.data.status === 'success') {
      modal.hide();
      delayAlert(`Data ${modelName} berhasil ditambah`, 'success');
    }
  } catch (err) {
    form.classList.remove('was-validated');
    validationErrorAlert(err);
  }
};

export const updateDataById = async (modelName, objId, data, form, Modals) => {
  try {
    const res = await axios({
      method: 'PATCH',
      url: `/api/v1/${modelName}/${objId}`,
      data,
    });

    if (res.data.status === 'success') {
      Modals.forEach((el) => el.hide());
      delayAlert(`Data ${modelName} berhasil diubah`, 'success');
    }
  } catch (err) {
    form.classList.remove('was-validated');
    validationErrorAlert(err);
  }
};

export const delDataById = async (modelName, objId, Modals) => {
  try {
    Modals.forEach((el) => el.hide());

    await axios({
      method: 'DELETE',
      url: `/api/v1/${modelName}/${objId}`,
    });

    delayAlert(`Data ${modelName} berhasil dihapus`, 'success');
  } catch (err) {
    showAlert(err.response.data.message, 'danger');
  }
};
