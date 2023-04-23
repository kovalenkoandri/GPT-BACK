const express = require('express');
const ctrl = require('../../controllers/auth');

const router = express.Router();

router.post('/image', ctrl.image);
router.post('/imageb64', ctrl.imageb64);
router.post('/generate', ctrl.generate);

module.exports = router;
