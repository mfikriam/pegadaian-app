const express = require('express');
const pegawaiController = require('../controllers/pegawaiController');

const router = express.Router();

router.route('/').get(pegawaiController.getAllPegawai).post(pegawaiController.createPegawai);

router
  .route('/:id')
  .get(pegawaiController.getPegawai)
  .patch(pegawaiController.updatePegawai)
  .delete(pegawaiController.deletePegawai);

module.exports = router;
