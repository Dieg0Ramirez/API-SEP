var express = require('express');
var app = express();

var nivelFormacionController = require('../../controllers/v1/nivelFormacionController');

// ==========================================
// obtener todos los estados
// ==========================================
app.get('/nivelFormacion/', nivelFormacionController.getNivelFormacion);

module.exports = app;