var express = require('express');
var app = express();
var fichaController = require('./../../controllers/v1/fichaController');
var mdAutenticacion = require('./../../middlewares/v1/autenticacion');

// ==========================================
// obtener todos los estados
// ==========================================
app.get('/ficha/', mdAutenticacion.verificaToken, fichaController.getFicha);

// ==========================================
// actualizar un estado
// ==========================================
app.put('/ficha/:id', mdAutenticacion.verificaToken, fichaController.updateficha);

// ==========================================
// crear un nuevo estado 
// ==========================================
app.post('/ficha/', mdAutenticacion.verificaToken, fichaController.saveFicha);

//====================================================
//desabilitar estado
//=====================================================

app.put('/ficha/disponible/:id', mdAutenticacion.verificaToken, fichaController.changeAvailability);

module.exports = app;