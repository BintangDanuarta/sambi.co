const express = require('express');
const router = express.Router();
const paymentController = require('../controllers/paymentController');
const authMiddleware = require('../middleware/authMiddleware');

router.post('/intent', authMiddleware, express.json(), paymentController.createIntent);
router.post('/tripay/callback', express.json(), paymentController.tripayCallback);

module.exports = router;
