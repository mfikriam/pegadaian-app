/* eslint-disable */
import '@babel/polyfill';
import { DataTable } from 'simple-datatables';

import { showAlert } from './alert';
import { addNewData, updateDataById, delDataById } from './manage-data';
import { naiveBayes } from './classification';

//? DOM Element - Halaman Pegawai
const pegawaiTable = document.querySelector('#pegawai-table');
const addPegawaiForm = document.querySelector('#form-add-pegawai');
const updatePegawaiBtns = document.querySelectorAll('.btn-update-pegawai');
const deletePegawaiBtns = document.querySelectorAll('.btn-delete-pegawai');

//? DOM Element - Halaman Pengaju
const pengajuTable = document.querySelector('#pengaju-table');
const addPengajuForm = document.querySelector('#form-add-pengaju');
const updatePengajuBtns = document.querySelectorAll('.btn-update-pengaju');
const deletePengajuBtns = document.querySelectorAll('.btn-delete-pengaju');

//***************** Halaman Pegawai ********************/
//? Datatables Pegawai
if (pegawaiTable) {
  const options = {
    perPage: 5,
    columns: [{ select: 8, sortable: false }],
  };
  new DataTable(pegawaiTable, options);
}

//? Add Data Pegawai
if (addPegawaiForm) {
  const addPegawaiModal = document.querySelector('#modal-add-pegawai');
  const bsAddPegawaiModal = new bootstrap.Modal(addPegawaiModal);

  addPegawaiForm.addEventListener('submit', (e) => {
    e.preventDefault();
    addPegawaiForm.classList.add('was-validated');

    if (addPegawaiForm.checkValidity()) {
      const pegawaiObj = {
        nama: addPegawaiForm.querySelector('#add-nama').value,
        jabatan: addPegawaiForm.querySelector('#add-jabatan').value,
        masa_kerja: addPegawaiForm.querySelector('#add-masa_kerja').value,
        grade_gaji: addPegawaiForm.querySelector('#add-grade_gaji').value,
        status_nikah: addPegawaiForm.querySelector('#add-status_nikah').value,
        jumlah_anak: addPegawaiForm.querySelector('#add-jumlah_anak').value,
        hutang_tempat_lain: addPegawaiForm.querySelector('#add-hutang_tempat_lain').value,
        kelayakan: addPegawaiForm.querySelector('#add-kelayakan').value,
      };

      addNewData('pegawai', pegawaiObj, addPegawaiForm, bsAddPegawaiModal);
    }
  });
}

//? Update Data Pegawai
if (updatePegawaiBtns.length > 0) {
  const updatePegawaiModalList = document.querySelectorAll('[id^="modal-update-pegawai"]');
  const bsUpdatePegawaiModalList = Array.from(updatePegawaiModalList).map(
    (el) => new bootstrap.Modal(el),
  );
  const updateDataFormList = document.querySelectorAll(`[id^="form-update-pegawai"]`);

  updateDataFormList.forEach((form) => {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      form.classList.add('was-validated');
      const pegawaiId = form.dataset.objId;

      if (form.checkValidity()) {
        const pegawaiObj = {
          nama: form.querySelector('#update-nama').value,
          jabatan: form.querySelector('#update-jabatan').value,
          masa_kerja: form.querySelector('#update-masa_kerja').value,
          grade_gaji: form.querySelector('#update-grade_gaji').value,
          status_nikah: form.querySelector('#update-status_nikah').value,
          jumlah_anak: form.querySelector('#update-jumlah_anak').value,
          hutang_tempat_lain: form.querySelector('#update-hutang_tempat_lain').value,
          kelayakan: form.querySelector('#update-kelayakan').value,
        };
        updateDataById('pegawai', pegawaiId, pegawaiObj, form, bsUpdatePegawaiModalList);
      }
    });
  });
}

//? Delete Data Pegawai
if (deletePegawaiBtns.length > 0) {
  const deletePegawaiModalList = document.querySelectorAll('[id^="modal-delete-pegawai"]');
  const bsDeletePegawaiModalList = Array.from(deletePegawaiModalList).map(
    (el) => new bootstrap.Modal(el),
  );

  deletePegawaiBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      const pegawaiId = btn.dataset.objId;
      delDataById('pegawai', pegawaiId, bsDeletePegawaiModalList);
    });
  });
}

//***************** Halaman Pengaju ********************/
let dataTrain = [];
let dataTest = [];

//? Datatables Pengaju
if (pengajuTable) {
  const options = {
    perPage: 5,
    columns: [{ select: 9, sortable: false }],
  };
  new DataTable(pengajuTable, options);

  //? Get Data Pegawai
  const pegawaiObjArr = JSON.parse(document.querySelector('#title-pengaju').dataset.pegawaiObjArr);

  //? Split Dataset Pegawai
  const splitIndex = Math.floor(pegawaiObjArr.length * 0.9);
  // dataTrain = pegawaiObjArr.slice(0, splitIndex);
  dataTrain = [...pegawaiObjArr];
  if (pegawaiObjArr.length >= 10) {
    dataTest = pegawaiObjArr.slice(-10);
  } else {
    dataTest = pegawaiObjArr.slice(splitIndex);
  }
}

//? Add Data Pengaju
if (addPengajuForm) {
  const addPengajuModal = document.querySelector('#modal-add-pengaju');
  const bsAddPengajuModal = new bootstrap.Modal(addPengajuModal);

  addPengajuForm.addEventListener('submit', (e) => {
    e.preventDefault();
    addPengajuForm.classList.add('was-validated');

    if (addPengajuForm.checkValidity()) {
      const pengajuObj = {
        nama: addPengajuForm.querySelector('#add-nama').value,
        jabatan: addPengajuForm.querySelector('#add-jabatan').value,
        masa_kerja: addPengajuForm.querySelector('#add-masa_kerja').value,
        grade_gaji: addPengajuForm.querySelector('#add-grade_gaji').value,
        status_nikah: addPengajuForm.querySelector('#add-status_nikah').value,
        jumlah_anak: addPengajuForm.querySelector('#add-jumlah_anak').value,
        hutang_tempat_lain: addPengajuForm.querySelector('#add-hutang_tempat_lain').value,
      };

      //? Naive Bayes
      const { prediksi_kelayakan, akurasi } = naiveBayes(dataTrain, dataTest, pengajuObj);
      pengajuObj['prediksi_kelayakan'] = prediksi_kelayakan;
      pengajuObj['akurasi'] = akurasi;

      addNewData('pengaju', pengajuObj, addPengajuForm, bsAddPengajuModal);
    }
  });
}

//? Update Data Pengaju
if (updatePengajuBtns.length > 0) {
  const updatePengajuModalList = document.querySelectorAll('[id^="modal-update-pengaju"]');
  const bsUpdatePengajuModalList = Array.from(updatePengajuModalList).map(
    (el) => new bootstrap.Modal(el),
  );
  const updateDataFormList = document.querySelectorAll(`[id^="form-update-pengaju"]`);

  updateDataFormList.forEach((form) => {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      form.classList.add('was-validated');
      const pengajuId = form.dataset.objId;

      if (form.checkValidity()) {
        const pengajuObj = {
          nama: form.querySelector('#update-nama').value,
          jabatan: form.querySelector('#update-jabatan').value,
          masa_kerja: form.querySelector('#update-masa_kerja').value,
          grade_gaji: form.querySelector('#update-grade_gaji').value,
          status_nikah: form.querySelector('#update-status_nikah').value,
          jumlah_anak: form.querySelector('#update-jumlah_anak').value,
          hutang_tempat_lain: form.querySelector('#update-hutang_tempat_lain').value,
        };

        //? Naive Bayes
        const { prediksi_kelayakan, akurasi } = naiveBayes(dataTrain, dataTest, pengajuObj);
        pengajuObj['prediksi_kelayakan'] = prediksi_kelayakan;
        pengajuObj['akurasi'] = akurasi;

        updateDataById('pengaju', pengajuId, pengajuObj, form, bsUpdatePengajuModalList);
      }
    });
  });
}

//? Delete Data Pengaju
if (deletePengajuBtns.length > 0) {
  const deletePengajuModalList = document.querySelectorAll('[id^="modal-delete-pengaju"]');
  const bsDeletePengajuModalList = Array.from(deletePengajuModalList).map(
    (el) => new bootstrap.Modal(el),
  );

  deletePengajuBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      const pengajuId = btn.dataset.objId;
      delDataById('pengaju', pengajuId, bsDeletePengajuModalList);
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
