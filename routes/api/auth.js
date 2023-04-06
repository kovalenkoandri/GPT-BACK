const express = require('express');
const ctrl = require('../../controllers/auth');

const router = express.Router();

router.post('/image', ctrl.image);
router.post('/generate', ctrl.generate);

module.exports = router;
