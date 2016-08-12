'usr strict';

const path = require('path');
const mongoose = require('mongoose');

let userModel = mongoose.model('userModel');

//响应/account/login
exports.loginGet = (req,res)=>{
	res.render(path.join(__dirname,'../views/login.html'),{},(err,content)=>{
		if(err){
			console.log(err);
			res.end(err);
			return;
		}
		res.end(content);
	});
}

exports.loginPost = (req,res)=>{
	let username = req.body.username;
	let password = req.body.password;
	let where = {name:username,password:password};
	userModel.find(where,(err,data)=>{
		if(data.length == 0){
			res.end('<script>alert("登录失败");window.location=window.location</script>');
		}else{
			//记录登录用户的用户名和用户身份
			req.session.name = username;
			req.session.type = data[0].type;
			res.end('<script>alert("登录成功");window.location="/"</script>');
		}
	})
}


//响应/account/register
exports.registerGet = (req,res)=>{
	res.render(path.join(__dirname,'../views/register.html'),{},(err,content)=>{
		if(err){
			console.log(err);
			res.end(err);
			return;
		}
		res.end(content);
	});
}

exports.registerPost = (req,res)=>{
	//把数据插入到数据库中
	userModel.create({
		name : req.body.username,
		password : req.body.password,
		email : req.body.email,
		type : '1'
	},(err)=>{
		if(err){
			console.log(err);
			res.end(err);
			return;
		}
		res.end('<script>alert("注册成功");window.location="/account/login"</script>');
	})
}