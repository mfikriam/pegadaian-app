const express = require('express');
const pengajuController = require('../controllers/pengajuController');

const router = express.Router();

router.route('/').get(pengajuController.getAllPengaju).post(pengajuController.createPengaju);

router
  .route('/:id')
  .get(pengajuController.getPengaju)
  .patch(pengajuController.updatePengaju)
  .delete(pengajuController.deletePengaju);

module.exports = router;
