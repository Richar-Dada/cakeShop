'usr strict';

const path = require('path');

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
	res.end('login');
}