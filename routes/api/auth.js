const express = require("express");
const ctrl = require("../../controllers/auth");

const router = express.Router();

router.get("/logout", authenticate, ctrl.logout);


module.exports = router;
