'use strict'
 
var mongoose = require('mongoose');
var app = require('./app');
var port = 3700;

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/portafolio')
        .then(() => {
            console.log("Conexión con exito!!!");
            
            // Creacion del servidor
            app.listen(port, () => {
                console.log("Servidor corriendo....");
            });
        
        })
        .catch(err => console.log(err));
