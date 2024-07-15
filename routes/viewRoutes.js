const express = require('express');
const viewController = require('./../controllers/viewController');

const router = express.Router();

router.get('/', viewController.getNasabahLamaPage);
router.get('/nasabah-lama', viewController.getNasabahLamaPage);
router.get('/nasabah-baru', viewController.getNasabahBaruPage);

module.exports = router;
