'use strict'

var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var path = require('path');

//Inicializar variable
var app = express();

//CORS
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Methods", " GET, POST, PUT, OPTIONS");
    next();
});
//body parser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//importar rutas
var appRoutesV1 = require('./routes/v1/app');
var usuarioRoutesV1 = require('./routes/v1/usuarioRoutes');
var loginRoutesV1 = require('./routes/v1/loginRoutes');
var estodoRoutesV1 = require('./routes/v1/estadoRoutes');
var cadenaRoutesV1 = require('./routes/v1/cadenaRoutes');
var programaRoutesV1 = require('./routes/v1/programaRoutes');
var nivelFormacionRoutesV1 = require('./routes/v1/nivelFormacionRoutes');
var tipoDocumentoRoutesV1 = require('./routes/v1/tipoDocumentoRoutes');
var fichaRoutesV1 = require('./routes/v1/fichaRoutes');
var excelRoutesV1 = require('./routes/v1/excelRoutes');
var alternativaRoutesV1 = require('./routes/v1/alternativaRoutes');
var aprendizRoutesV1 = require('./routes/v1/aprendizRoutes');

//conexion a la base de datos

var hostMongo = 'localhost';
var portMongo = '27017';

mongoose.connection.openUri(`mongodb://${hostMongo}:${portMongo}/seguimiento_sepDB`, (err, res) => {
    if (err) throw err;
    console.log('Base de datos: \x1b[32m%s\x1b[0m', 'online');

});

//rutas
app.use('/api/v1', aprendizRoutesV1);
app.use('/api/v1', fichaRoutesV1);
app.use('/api/v1', tipoDocumentoRoutesV1);
app.use('/api/v1', nivelFormacionRoutesV1);
app.use('/api/v1', cadenaRoutesV1);
app.use('/api/v1', estodoRoutesV1);
app.use('/api/v1', loginRoutesV1);
app.use('/api/v1', usuarioRoutesV1);
app.use('/api/v1', programaRoutesV1);
app.use('/api/v1', appRoutesV1);
app.use('/api/v1', excelRoutesV1);
app.use('/api/v1', alternativaRoutesV1);


var io = require('socket.io').listen(app.listen(3000, () => {
    console.log('Corriendo puerto 3000: \x1b[32m%s\x1b[0m', 'online');
}), { log: false, origins: '*:*' });

io.sockets.on('connection', function(socket) {
    console.log('Cliente de Socket Conectado');
});

app.set('socketio', io);