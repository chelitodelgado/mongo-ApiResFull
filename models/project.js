'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var projectSchema = Schema({
	name: String,
	category: String,
    descripcion: String,
	year: String,
	langs: String,
	image: String
});

module.exports = mongoose.model('Project', projectSchema);
