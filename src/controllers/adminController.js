'use strict';

const path = require('path');
const mongoose = require('mongoose');
const formidable = require('formidable');
let adminModel = mongoose.model('adminModel');

//响应/admin/list
exports.listGet = (req,res)=>{
	adminModel.find({},(err,data)=>{
		if(err){
			console.log(err);
			res.end(err);
			return;
		}
		res.render(path.join(__dirname,'../views/list.html'),{title:'商品列表',data:data},(err,content)=>{
			res.end(content);
		});
	})
}

exports.search = (req,res)=>{
	let name = req.body.name;
	let regName = new RegExp(name,'i');
	adminModel.find({name:regName},(err,data)=>{
		if(err){
			console.log(err);
			res.end(err);
			return;
		}
		res.render(path.join(__dirname,'../views/list.html'),{title:'商品列表',name:name,data:data},(err,content)=>{
			res.end(content);
		});
	});
}

//响应/admin/add
exports.addGet = (req,res)=>{
	res.render(path.join(__dirname,'../views/add.html'),{title:'添加商品'},(err,content)=>{
		res.end(content);
	});
}

exports.addPost = (req,res)=>{
	//获取上传的数据
	let form = new formidable.IncomingForm();
	form.uploadDir = path.join(__dirname,"../static/upload");
	form.keepExtensions = true;
	form.parse(req,function(err,fields,files){
		//把数据插入到数据库
		adminModel.create({
			name : fields.name,
			price : fields.price,
			keyword : fields.keyword,
			content : fields.content,
			filepath : path.basename(files.uploadImg.path),
			createTime : Date.now()

		},(err)=>{
			if(err){
				console.log(err);
				res.end(err);
				return;
			}
			res.end('<script>alert("商品添加成功");window.location="/admin/list"</script>');
		});
		
	});
}

//响应/admin/edit
exports.editGet = (req,res)=>{
	let id = req.params.id;
	adminModel.find({_id:id},(err,data)=>{
		if(err){
			console.log(err);
			res.end(err);
			return;
		}
		res.render(path.join(__dirname,'../views/edit.html'),{title:'修改商品信息',data:data[0]},(err,content)=>{
			res.end(content);
		});
	})
}

exports.editPost = (req,res)=>{
	//获取上传的数据
	let form = new formidable.IncomingForm();
	form.uploadDir = path.join(__dirname,"../static/upload");
	form.keepExtensions = true;
	form.parse(req,function(err,fields,files){
		console.log(files);
		//把数据更新到数据库
		if(files.uploadImg.size != 0){
			adminModel.update({_id:fields.id},{
				name : fields.name,
				price : fields.price,
				keyword : fields.keyword,
				content : fields.content,
				filepath : path.basename(files.uploadImg.path)

			},(err)=>{
				if(err){
					console.log(err);
					res.end(err);
					return;
				}
				res.end('<script>alert("商品修改成功");window.location="/admin/list"</script>');
			});
		}else{
			adminModel.update({_id:fields.id},{
				name : fields.name,
				price : fields.price,
				keyword : fields.keyword,
				content : fields.content	
			},(err)=>{
				if(err){
					console.log(err);
					res.end(err);
					return;
				}
				res.end('<script>alert("商品修改成功");window.location="/admin/list"</script>');
			});
		}
		
		
	});
}

//响应/admin/del
exports.delGet = (req,res)=>{
	let id = req.params.id;
	adminModel.remove({_id:id},(err)=>{
		if(err){
			console.log(err);
			res.end(err);
			return;
		}
		res.end('<script>alert("商品删除成功");window.location="/admin/list"</script>');
	})
}