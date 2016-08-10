'use strict';

const express = require('express');
let router = express.Router();

//把admin控制器引入
let adminController = require('../controllers/adminController.js');

//路由匹配来admin的不同页面请求
router.get('/list',adminController.listGet);
router.get('/add',adminController.addGet);

module.exports = router;

