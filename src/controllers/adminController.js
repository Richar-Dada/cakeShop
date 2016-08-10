'use strict';

const path = require('path');

exports.listGet = (req,res)=>{
	res.render(path.join(__dirname,'../views/list.html'),{},(err,content)=>{
		console.log(__dirname);
		res.end(content);
	});
}