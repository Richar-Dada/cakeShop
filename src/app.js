'use strict';
//作用是开启web服务器

// 这是从环境变量中去获取一个PORT的变量值，如果没有则默认给6000端口
let PORT = process.env.PORT || 7777;

const express = require('express');
const xtpl = require('xtpl');
const path = require('path');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

let app = express();

//连接数据库
mongoose.connect('mongodb://localhost/cakeShop');
require('./models/adminModel.js');


//设置模板引擎
app.set('views','./views');
app.set('view engine','html');
app.engine('html',xtpl.renderFile);

//设置bodyParser中间件，用来解析上传的数据
app.use(bodyParser());

//配置静态资源文件夹
app.use(express.static(path.join(__dirname,'./static')));



//把路由引入
let adminRouter = require('./router/adminRouter.js');
let userRouter = require('./router/userRouter.js');
let accountRouter = require('./router/accountRouter.js');
app.use('/admin',adminRouter);
app.use('',userRouter);
app.use('/account',accountRouter);

app.listen(PORT,()=>{

    console.log('环境启动'+ PORT);
});

