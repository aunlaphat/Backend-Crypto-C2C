const express = require('express');
const router = express.Router();
const walletController = require('../controllers/walletController');

router.get('/:userId/balance', walletController.getBalance);
router.post('/transfer', walletController.transferCrypto);
router.post('/external-transfer', walletController.externalTransfer);


module.exports = router;