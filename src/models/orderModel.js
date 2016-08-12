'use strict';

const mongoose = require('mongoose');

let schema = mongoose.Schema({
	name : String,
	price : String,
	keyword : String,
	content : String,
	filepath : String,
	parent : String,
	isPlay : String,
	isRecevied : String,
	createTime : String
});

let orderModel = mongoose.model('orderModel',schema);