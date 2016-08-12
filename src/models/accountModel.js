'use strict';

const mongoose = require('mongoose');

let schema = mongoose.Schema({
	name : String,
	password : String,
	email : String,
	type : String
});

let model = mongoose.model('userModel',schema);