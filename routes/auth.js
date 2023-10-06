const express = require('express');
const authContoller = require('../controllers/auth.js');
const router = express.Router();

router.post("/register", authContoller.register)

module.exports = router;