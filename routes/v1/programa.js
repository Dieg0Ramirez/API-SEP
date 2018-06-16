var express = require('express');
var app = express();

var programaController = require('../../controllers/v1/programaController');
var mdAutenticacion = require('./../../middlewares/v1/autenticacion');

// ==========================================
// obtener todos los estados
// ==========================================
app.get('/programa/', mdAutenticacion.verificaToken, programaController.getProgramas);

// ==========================================
// actualizar un programa
// ==========================================
app.put('/programa/:id', mdAutenticacion.verificaToken, programaController.updatePrograma);

// ==========================================
// crear un nuevo programa 
// ==========================================

app.post('/programa/', mdAutenticacion.verificaToken, programaController.savePrograma);

// ==========================================
// borrar un usuario
// ==========================================
app.put('/programa/disponible/:id', mdAutenticacion.verificaToken, programaController.changeAvailability);

module.exports = app;