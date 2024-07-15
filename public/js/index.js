/* eslint-disable */
import '@babel/polyfill';
import { DataTable } from 'simple-datatables';

import { showAlert } from './alert';
import { addNewData, updateDataById, delDataById } from './manage-data';
// import { naiveBayes } from './classification';

//? DOM Element - Halaman Nasabah Lama
const nasabahLamaTable = document.querySelector('#nasabah-lama-table');
const addNasabahLamaForm = document.querySelector('#form-add-nasabah-lama');
const updateNasabahLamaBtns = document.querySelectorAll('.btn-update-nasabah-lama');
const deleteNasabahLamaBtns = document.querySelectorAll('.btn-delete-nasabah-lama');

//? DOM Element - Halaman Nasabah Baru
const nasabahBaruTable = document.querySelector('#nasabah-baru-table');
const addNasabahBaruForm = document.querySelector('#form-add-nasabah-baru');
const updateNasabahBaruBtns = document.querySelectorAll('.btn-update-nasabah-baru');
const deleteNasabahBaruBtns = document.querySelectorAll('.btn-delete-nasabah-baru');

//***************** Halaman Nasabah Lama ********************/
//? Datatables Nasabah Lama
if (nasabahLamaTable) {
  const options = {
    perPage: 10,
    columns: [{ select: 7, sortable: false }],
  };
  new DataTable(nasabahLamaTable, options);
}

//? Add Data Nasabah Lama
if (addNasabahLamaForm) {
  const addNasabahLamaModal = document.querySelector('#modal-add-nasabah-lama');
  const bsAddNasabahLamaModal = new bootstrap.Modal(addNasabahLamaModal);

  addNasabahLamaForm.addEventListener('submit', (e) => {
    e.preventDefault();
    addNasabahLamaForm.classList.add('was-validated');

    if (addNasabahLamaForm.checkValidity()) {
      const nasabahLamaObj = {
        nama: addNasabahLamaForm.querySelector('#add-nama').value,
        usia: addNasabahLamaForm.querySelector('#add-usia').value,
        pendapatan: addNasabahLamaForm.querySelector('#add-pendapatan').value / 1000000,
        utang: addNasabahLamaForm.querySelector('#add-utang').value / 1000000,
        riwayat_pembayaran: addNasabahLamaForm.querySelector('#add-riwayat_pembayaran').value,
        potensial: addNasabahLamaForm.querySelector('#add-potensial').value,
      };

      addNewData('nasabah-lama', nasabahLamaObj, addNasabahLamaForm, bsAddNasabahLamaModal);
    }
  });
}

//? Update Nasabah Lama
if (updateNasabahLamaBtns.length > 0) {
  const updateNasabahLamaModalList = document.querySelectorAll('[id^="modal-update-nasabah-lama"]');
  const bsUpdateNasabahLamaModalList = Array.from(updateNasabahLamaModalList).map((el) => new bootstrap.Modal(el));
  const updateDataFormList = document.querySelectorAll(`[id^="form-update-nasabah-lama"]`);

  updateDataFormList.forEach((form) => {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      form.classList.add('was-validated');
      const nasabahLamaId = form.dataset.objId;

      if (form.checkValidity()) {
        const nasabahLamaObj = {
          nama: form.querySelector('#update-nama').value,
          usia: form.querySelector('#update-usia').value,
          pendapatan: form.querySelector('#update-pendapatan').value / 1000000,
          utang: form.querySelector('#update-utang').value / 1000000,
          riwayat_pembayaran: form.querySelector('#update-riwayat_pembayaran').value,
          potensial: form.querySelector('#update-potensial').value,
        };
        updateDataById('nasabah-lama', nasabahLamaId, nasabahLamaObj, form, bsUpdateNasabahLamaModalList);
      }
    });
  });
}

//? Delete Data Nasabah Lama
if (deleteNasabahLamaBtns.length > 0) {
  const deleteNasabahLamaModalList = document.querySelectorAll('[id^="modal-delete-nasabah-lama"]');
  const bsDeleteNasabahLamaModalList = Array.from(deleteNasabahLamaModalList).map((el) => new bootstrap.Modal(el));

  deleteNasabahLamaBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      const nasabahLamaId = btn.dataset.objId;
      delDataById('nasabah-lama', nasabahLamaId, bsDeleteNasabahLamaModalList);
    });
  });
}

//***************** Halaman Nasabah Baru ********************/
let dataTrain = [];
let dataTest = [];

//? Datatables Nasabah Baru
if (nasabahBaruTable) {
  const options = {
    perPage: 10,
    columns: [{ select: 8, sortable: false }],
  };
  new DataTable(nasabahBaruTable, options);

  //? Get Data Nasabah Lama
  const nasabahLamaObjArr = JSON.parse(document.querySelector('#title-nasabah-baru').dataset.nasabahLamaObjArr);

  //? Split Dataset Nasabah Lama
  const splitIndex = Math.floor(nasabahLamaObjArr.length * 0.7);
  dataTrain = nasabahLamaObjArr.slice(0, splitIndex);
  dataTest = nasabahLamaObjArr.slice(splitIndex);
}

//? Add Data Nasabah Baru
if (addNasabahBaruForm) {
  const addNasabahBaruModal = document.querySelector('#modal-add-nasabah-baru');
  const bsAddNasabahBaruModal = new bootstrap.Modal(addNasabahBaruModal);

  addNasabahBaruForm.addEventListener('submit', (e) => {
    e.preventDefault();
    addNasabahBaruForm.classList.add('was-validated');

    if (addNasabahBaruForm.checkValidity()) {
      const nasabahBaruObj = {
        nama: addNasabahBaruForm.querySelector('#add-nama').value,
        usia: addNasabahBaruForm.querySelector('#add-usia').value,
        pendapatan: addNasabahBaruForm.querySelector('#add-pendapatan').value / 1000000,
        utang: addNasabahBaruForm.querySelector('#add-utang').value / 1000000,
        riwayat_pembayaran: addNasabahBaruForm.querySelector('#add-riwayat_pembayaran').value,
      };

      //? Naive Bayes
      // const { prediksi_potensial, akurasi } = naiveBayes(dataTrain, dataTest, nasabahBaruObj);
      const prediksi_potensial = 1;
      const akurasi = 0.91;
      nasabahBaruObj['prediksi_potensial'] = prediksi_potensial;
      nasabahBaruObj['akurasi'] = akurasi;

      addNewData('nasabah-baru', nasabahBaruObj, addNasabahBaruForm, bsAddNasabahBaruModal);
    }
  });
}

//? Update Data Nasabah Baru
if (updateNasabahBaruBtns.length > 0) {
  const updateNasabahBaruModalList = document.querySelectorAll('[id^="modal-update-nasabah-baru"]');
  const bsUpdateNasabahBaruModalList = Array.from(updateNasabahBaruModalList).map((el) => new bootstrap.Modal(el));
  const updateDataFormList = document.querySelectorAll(`[id^="form-update-nasabah-baru"]`);

  updateDataFormList.forEach((form) => {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      form.classList.add('was-validated');
      const nasabahBaruId = form.dataset.objId;

      if (form.checkValidity()) {
        const nasabahBaruObj = {
          nama: form.querySelector('#update-nama').value,
          usia: form.querySelector('#update-usia').value,
          pendapatan: form.querySelector('#update-pendapatan').value / 1000000,
          utang: form.querySelector('#update-utang').value / 1000000,
          riwayat_pembayaran: form.querySelector('#update-riwayat_pembayaran').value,
        };

        //? Naive Bayes
        // const { prediksi_potensial, akurasi } = naiveBayes(dataTrain, dataTest, nasabahBaruObj);
        const prediksi_potensial = 0;
        const akurasi = 0.99;
        nasabahBaruObj['prediksi_potensial'] = prediksi_potensial;
        nasabahBaruObj['akurasi'] = akurasi;

        updateDataById('nasabah-baru', nasabahBaruId, nasabahBaruObj, form, bsUpdateNasabahBaruModalList);
      }
    });
  });
}

//? Delete Data Nasabah Baru
if (deleteNasabahBaruBtns.length > 0) {
  const deleteNasabahBaruModalList = document.querySelectorAll('[id^="modal-delete-nasabah-baru"]');
  const bsDeleteNasabahBaruModalList = Array.from(deleteNasabahBaruModalList).map((el) => new bootstrap.Modal(el));

  deleteNasabahBaruBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      const nasabahBaruId = btn.dataset.objId;
      delDataById('nasabah-baru', nasabahBaruId, bsDeleteNasabahBaruModalList);
    });
  });
}

//************************** ALERT ********************************** */
const delayAlertMsg = sessionStorage.getItem('delay-alert-message');
const delayAlertType = sessionStorage.getItem('delay-alert-type');
if (delayAlertMsg) {
  showAlert(delayAlertMsg, delayAlertType);
  sessionStorage.removeItem('delay-alert-message');
  sessionStorage.removeItem('delay-alert-type');
}
