'use strict'

var express = require('express');
var projectController = require('../controllers/project');

var router = express.Router();

var multiPart = require('connect-multiparty');
var multiPartMiddleware = multiPart({uploadDir: './uploads'})

router.get('/home', projectController.home);
router.post('/test', projectController.test);
router.post('/save-project', projectController.saveProject);
router.get('/project/:id?', projectController.getProject);
router.get('/projects', projectController.getProjects);
router.put('/project/:id', projectController.updateProject);
router.delete('/project/:id', projectController.deleteProject);
router.post('/uploadImage/:id',multiPartMiddleware, projectController.uploadImage);
router.get('/getImage/:image', projectController.getImageFile);

module.exports = router;
