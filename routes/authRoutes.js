const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

router.post('/authenticate', authController.authenticateUser);
router.post('/sign-up',authController.signup);
module.exports = router;










