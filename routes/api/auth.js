const express = require('express');
const ctrl = require('../../controllers/auth');

const router = express.Router();

router.post('/generate', ctrl.generate);
router.post('/image', ctrl.image);
router.post('/imageb64', ctrl.imageb64);
router.post('/imageVariation', ctrl.imageVariation);
router.post('/getData', ctrl.getData);

module.exports = router;
