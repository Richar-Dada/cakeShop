'use strict';

const express = require('express');
let router = express.Router();

//把admin控制器引入
let adminController = require('../controllers/adminController.js');

//路由匹配来admin的不同页面请求
router.get('/list',adminController.listGet);
router.post('/list',adminController.search);
router.get('/add',adminController.addGet);
router.post('/add',adminController.addPost);
router.get('/edit/:id',adminController.editGet);
router.post('/edit',adminController.editPost);
router.get('/del/:id',adminController.delGet);

module.exports = router;

