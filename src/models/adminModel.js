'use strict';

const mongoose = require('mongoose');

let schema = new mongoose.Schema({
	name : String,
	price : String,
	keyword : String,
	content : String,
	filepath : String,
	createTime : String
});

let model = mongoose.model('adminModel',schema);