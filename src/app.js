'use strict';
//作用是开启web服务器

// 这是从环境变量中去获取一个PORT的变量值，如果没有则默认给6000端口
let PORT = process.env.PORT || 7777;

const express = require('express');
const xtpl = require('xtpl');
const path = require('path');

let app = express();

//设置模板引擎
app.set('views','./views');
app.set('view engine','html');
app.engine('html',xtpl.renderFile);


//配置静态资源文件夹
app.use(express.static(path.join(__dirname,'./static')));


//把路由引入
let adminRouter = require('./router/adminRouter.js');
app.use('/admin',adminRouter);

app.listen(PORT,()=>{

    console.log('环境启动'+ PORT);
});

