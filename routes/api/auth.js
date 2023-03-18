const express = require('express');
const ctrl = require('../../controllers/auth');

const router = express.Router();

// router.get('/logout', ctrl.logout);
router.post('/generate', ctrl.generate);

module.exports = router;
