'use strict'

var Project = require('../models/project');
var fs = require('fs');

var controller = {

	home: function(req, res){
		return res.status(200).send({
			message: "Soy la home"
		});
	},

	test: function(req, res){
		return res.status(200).send({
			message: "Soy el test"
		});
	},

	saveProject: function(req, res){
		var project = new Project();
		var params = req.body;
		project.name = params.name;
		project.description = params.description;
		project.category = params.category;
		project.year = params.year;
		project.langs = params.langs;
		project.image = null;

		project.save((err, projectStored) => {
			
			if(err) return res.status(500).send({message: "Error al uardar"});

			if(!projectStored) return res.status(400).send({message: "No se ha podido gurdar"});

			return res.status(200).send({project: projectStored});
		});
	},

	getProject: function(req, res){
		var projectId = req.params.id;
		if(projectId == null){
			return res.status(404).send({message: "El proyecto no existe"});
		}

		Project.findById(projectId, (err, project) => {

			if(err) return res.status(500).send({message: "Error de datos"});

			if(!project) return res.status(404).send({message: "El projecto no existe"});

			return res.status(200).send({
				project
			});
		});
	},

	getProjects: function(req, res){
		Project.find({}).sort('year').exec((err, projects) => {

			if(err) return res.status(500).send({message: "Error al devolver los datos"});

			if(!projects) return res.status(404).send({message: "NO hay Projectos"});

			return res.status(200).send({projects});
		});
	},

	updateProject: function(req, res){
		var projectId = req.params.id;
		var update = req.body;

		Project.findByIdAndUpdate(projectId, update, {new:true}, (err, projectUpdate) => {

			if(err) return req.status(500).send({message: "Error al actualizar"});

			if(!projectUpdate) return req.status(404).send({message: "No existe el projecto para actualizar"});

			return res.status(200).send({
				project: projectUpdate
			});
		});
	},
	
	deleteProject:function(req, res){
		var projectId = req.params.id;

		Project.findByIdAndRemove(projectId, (err, projectRemove) =>{
			if(err) return res.status(500).send({message: "No se pudo borrar"});

			if(!projectRemove) return res.status(404).send({message: "No se ha eliminado"});

			return res.status(200).send({
				project: projectRemove
			});
		});
	},

	uploadImage: function(req, res){
		var projectId = req.params.id;
		var fileNama = 'Error al subir imagen';

		if(req.files){
			var filePath = req.files.image.path;
			var fileSplit = filePath.split('/');
			var fileName = fileSplit[1];
			var extSplit = fileName.split('\.');
			var fileExt = extSplit[1];

			if(fileExt == 'png' || fileExt == 'jpg' || fileExt == 'jpeg' || fileExt == 'gif' ){
				Project.findByIdAndUpdate(projectId, {image: fileName},{new:true}, (err, projectUpdate)=>{
					if(err) return res.status(500).send({message: "Error al subir imagen"});

					if(!projectUpdate) return res.status(404).send({message: "La imagen no existe"});

					return res.status(200).send({
						project: projectUpdate
					});
				});

			} else{
				fs.unlink(filePath, (err) => {
					return res.status(200).send({
						message: "La extencion no de vlida"
					});
				});
			}

			return res.status(200).send({
				files: fileName
			});
		} else{
			return res.status(200).send({
				message: fileNama
			});
		}
	}	

};

module.exports = controller;