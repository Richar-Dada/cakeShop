'use strict';

const express = require('express');
let router = express.Router();

let accountController = require('../controllers/accountController.js');


router.get('/login',accountController.loginGet);
router.post('/login',accountController.loginPost);

module.exports = router;
