var express = require('express');
var app = express();

var busquedaController = require('../../controllers/v1/busquedaController');

app.get('/coleccion/:tabla/:busqueda', busquedaController);

module.exports = app;