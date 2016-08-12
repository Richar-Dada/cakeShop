'use strict';

const express = require('express');
let router = express.Router();

let accountController = require('../controllers/accountController.js');


router.get('/login',accountController.loginGet);
router.post('/login',accountController.loginPost);
router.get('/register',accountController.registerGet);
router.post('/register',accountController.registerPost);

module.exports = router;
