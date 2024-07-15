const express = require('express');
const nasabahLamaController = require('../controllers/nasabahLamaController');

const router = express.Router();

router.route('/').get(nasabahLamaController.getAllNasabahLama).post(nasabahLamaController.createNasabahLama);

router
  .route('/:id')
  .get(nasabahLamaController.getNasabahLama)
  .patch(nasabahLamaController.updateNasabahLama)
  .delete(nasabahLamaController.deleteNasabahLama);

module.exports = router;
