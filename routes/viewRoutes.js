const express = require('express');
const viewController = require('./../controllers/viewController');

const router = express.Router();

router.get('/', viewController.getPegawaiPage);
router.get('/pegawai', viewController.getPegawaiPage);
router.get('/pengaju', viewController.getPengajuPage);

module.exports = router;
