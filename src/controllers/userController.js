'use strict';

const path = require('path');
const mongoose = require('mongoose');
const url = require('url');
const querystring = require('querystring');

let adminModel = mongoose.model('adminModel');
let orderModel = mongoose.model('orderModel');
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
			res.render(path.join(__dirname,'../views/index.html'),{data:data,sName:req.session.name,newData:newData},(err,content)=>{
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
		res.render(path.join(__dirname,'../views/allGoods.html'),{data:data,sName:req.session.name},(err,content)=>{
			if(err){
				console.log(err);
				res.end(err);
				return;
			}
			res.end(content);
		});
	});
}

//响应/shopCar请求
exports.shopCar = (req,res)=>{
	res.render(path.join(__dirname,'../views/shopCar.html'),{},(err,content)=>{
		res.end(content);
	})
	
}

//响应/user请求
exports.user = (req,res)=>{
	if(req.session.name){
		res.render(path.join(__dirname,'../views/user.html'),{sName:req.session.name},(err,content)=>{
			if(err){
				console.log(err);
				res.end(err);
				return;
			}
			res.end(content);
		});
	}else{
		res.render(path.join(__dirname,'../views/user.html'),{sName:'1'},(err,content)=>{
			if(err){
				console.log(err);
				res.end(err);
				return;
			}
			res.end(content);
		});
	}
}

//响应/detail请求
exports.detail = (req,res)=>{
	let id = req.params.id;
	adminModel.find({_id:id},(err,data)=>{
		if(err){
			console.log(err);
			res.end(err);
			return;
		}
		res.render(path.join(__dirname,'../views/detail.html'),{data:data[0]},(err,content)=>{
			if(err){
				console.log(err);
				res.end(err);
				return;
			}
			res.end(content);
		});
	})
}

//响应/buy请求
exports.buy = (req,res)=>{
	res.setHeader('Content-Type','text/html;charset=utf8');
	//先判断用户有没登录，如果没登录让它先登录
	//如果用户登录了，把订单插入到数据库，让它到订单中心付款
	if(!req.session.name){
		let result = JSON.stringify({"status":0,"message":"请先登录"});
		res.end(result);
	}else{
		let id = req.params.id;
		adminModel.find({_id:id},(err,data)=>{
			if(err){
				console.log(err);
				res.end(err);
				return;
			}
			orderModel.create({
				name : data[0].name,
				price : data[0].price,
				keyword : data[0].keyword,
				content : data[0].content,
				filepath : data[0].filepath,
				parent : req.session.name,
				isPlay : '0',
				isRecevied : '0',
				createTime : new Date()
			},(err)=>{
				if(err){
					console.log(err);
					res.end(err);
					return;
				}
				let result = JSON.stringify({"status":1,"message":"到订单中心付款"});
				res.end(result);
			});
		});	
	}
}

exports.buyPost = (req,res)=>{
	let data = req.body.data;
	for(let i=0;i<data.length;i++){
		orderModel.create({
				name : data[i].name,
				price : data[i].price,
				content : data[i].content,
				filepath : data[i].filepath,
				parent : req.session.name,
				isPlay : '0',
				isRecevied : '0',
				createTime : new Date()
			},(err)=>{
				if(err){
					console.log(err);
					res.end(err);
					return;
				}
				let result = JSON.stringify({"status":1,"message":"到订单中心付款"});
				res.end(result);
			});
	}
}

//响应/orderList请求
exports.orderlist = (req,res)=>{
	let username = req.session.name;
	//通过用户名把订单内容拿出来，渲染到页面上
	orderModel.find({parent:username},(err,data)=>{
		res.render(path.join(__dirname,'../views/orderlist.html'),{data:data},(err,content)=>{
			if(err){
				console.log(err);
				res.end(err);
				return;
			}
			res.end(content);
		});
	})
	
}

exports.orderlistPayment = (req,res)=>{
	let username = req.session.name;
	//通过用户名把订单内容拿出来，渲染到页面上
	orderModel.find({parent:username,isPlay:'0'},(err,data)=>{
		res.render(path.join(__dirname,'../views/orderlist.html'),{data:data},(err,content)=>{
			if(err){
				console.log(err);
				res.end(err);
				return;
			}
			res.end(content);
		});
	})
}

exports.orderlistConfirmRec = (req,res)=>{
	let username = req.session.name;
	//通过用户名把订单内容拿出来，渲染到页面上
	orderModel.find({parent:username,isPlay:'1',isRecevied:'0'},(err,data)=>{
		res.render(path.join(__dirname,'../views/orderlist.html'),{data:data},(err,content)=>{
			if(err){
				console.log(err);
				res.end(err);
				return;
			}
			res.end(content);
		});
	})
}

//响应/delOrder请求
exports.delOrder = (req,res)=>{
	res.setHeader('Content-Type',"text/html;charset=utf8");
	let id = querystring.parse(url.parse(req.url).query).id;
	//根据id删除对应的订单
	orderModel.remove({_id:id},(err)=>{
		if(err){
			console.log(err);
			res.end(err);
			return;
		}
		let result = JSON.stringify({"status":"1","message":"订单删除成功"});
		res.end(result);
	})
}

//响应/payment请求
exports.payment = (req,res)=>{
	res.setHeader('Content-Type',"text/html;charset=utf8");
	let id = querystring.parse(url.parse(req.url).query).id;
	console.log(id);
	//根据id删除对应的订单
	orderModel.update({_id:id},{isPlay:'1'},(err)=>{
		if(err){
			console.log(err);
			res.end(err);
			return;
		}
		let result = JSON.stringify({"status":"1","message":"订单支付成功"});
		res.end(result);
	})
}

//响应/confirmRec请求
exports.confirmRec = (req,res)=>{
	res.setHeader('Content-Type',"text/html;charset=utf8");
	let id = querystring.parse(url.parse(req.url).query).id;
	console.log(id);
	//根据id删除对应的订单
	orderModel.update({_id:id},{isRecevied:'1'},(err)=>{
		if(err){
			console.log(err);
			res.end(err);
			return;
		}
		let result = JSON.stringify({"status":"1","message":"确认收货成功"});
		res.end(result);
	})
}