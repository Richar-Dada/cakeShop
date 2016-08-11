'use strict';

const path = require('path');
const mongoose = require('mongoose');

let adminModel = mongoose.model('adminModel');

//响应主页请求
exports.indexGet = (req,res)=>{
	//获取热门商品数据，渲染到页面上
	adminModel.find({},(err,data)=>{
		if(err){
			console.log(err);
			red.end(err);
			return;
		}
		//获取最新商品数据
		adminModel.find({"createTime":{"$gt":"1470895800050"}},(err,newData)=>{
			if(err){
				console.log(err);
				red.end(err);
				return;
			}
			//把两个数据渲染到页面上
			res.render(path.join(__dirname,'../views/index.html'),{data:data,newData:newData},(err,content)=>{
				if(err){
					console.log(err);
					res.end(err);
					return;
				}
				res.end(content);
			});
		})		
	});
}

//响应allGoods请求
exports.allGoods = (req,res)=>{
	//把所有的数据显示出来
	adminModel.find({},(err,data)=>{
		if(err){
			console.log(err);
			res.end(err);
			return;
		}
		res.render(path.join(__dirname,'../views/allGoods.html'),{data:data},(err,content)=>{
			if(err){
				console.log(err);
				res.end(err);
				return;
			}
			res.end(content);
		});
	});
}
