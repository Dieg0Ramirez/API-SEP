var express = require('express');
var app = express();

var busquedaController = require('../../controllers/v1/busquedaController');

app.get('/busqueda/:termino', busquedaController.searchUsuario);

module.exports = app;