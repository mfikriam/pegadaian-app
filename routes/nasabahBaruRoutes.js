const express = require('express');
const nasabahBaruController = require('../controllers/nasabahBaruController');

const router = express.Router();

router.route('/').get(nasabahBaruController.getAllNasabahBaru).post(nasabahBaruController.createNasabahBaru);

router
  .route('/:id')
  .get(nasabahBaruController.getNasabahBaru)
  .patch(nasabahBaruController.updateNasabahBaru)
  .delete(nasabahBaruController.deleteNasabahBaru);

module.exports = router;
