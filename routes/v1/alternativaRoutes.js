var express = require('express');
var app = express();

var alternativaController = require('../../controllers/v1/alternativaController');
var mdAutenticacion = require('./../../middlewares/v1/autenticacion');

// ==========================================
// obtener todas las alternativas
// ==========================================
app.get('/alternativa/', mdAutenticacion.verificaToken, alternativaController.getAlternativas);

// ==========================================
// actualizar un alternativa
// ==========================================
app.put('/alternativa/:id', mdAutenticacion.verificaToken, alternativaController.updateAlternativa);

// ==========================================
// crear un nuevo alternativa 
// ==========================================

app.post('/alternativa/', mdAutenticacion.verificaToken, alternativaController.saveAlternativa);

// ==========================================
// borrar un usuario
// ==========================================
app.put('/alternativa/disponible/:id', mdAutenticacion.verificaToken, alternativaController.changeAvailability);

module.exports = app;