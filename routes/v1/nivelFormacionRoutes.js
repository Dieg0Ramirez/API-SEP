var express = require('express');
var app = express();

var nivelFormacionController = require('../../controllers/v1/nivelFormacionController');
var mdAutenticacion = require('./../../middlewares/v1/autenticacion');

// ==========================================
// obtener todos los estados
// ==========================================
app.get('/nivelFormacion/', mdAutenticacion.verificaToken, nivelFormacionController.getNivelFormacion);

// ==========================================
// actualizar un cadena
// ==========================================
app.put('/nivelFormacion/:id', mdAutenticacion.verificaToken, nivelFormacionController.updateNivelFormacion);

// ==========================================
// crear un nuevo cadena 
// ==========================================
app.post('/nivelFormacion/', mdAutenticacion.verificaToken, nivelFormacionController.saveNivelFormacion);

// ==========================================
// borrar un usuario
// ==========================================
app.put('/nivelFormacion/disponible/:id', mdAutenticacion.verificaToken, nivelFormacionController.changeAvailability);

module.exports = app;