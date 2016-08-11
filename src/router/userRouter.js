'use strict';

const express = require('express');
let router = express.Router();

let userController = require('../controllers/userController.js');

router.get('/',userController.indexGet);
router.get('/allGoods',userController.allGoods);


module.exports = router;
