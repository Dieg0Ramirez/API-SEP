var express = require('express');
var app = express();
var aprendizController = require('./../../controllers/v1/aprendizController');
var mdAutenticacion = require('./../../middlewares/v1/autenticacion');

// ==========================================
// obtener todos los estados
// ==========================================
app.get('/aprendiz/', mdAutenticacion.verificaToken, aprendizController.getAprendiz);

// ==========================================
// actualizar un estado
// ==========================================
app.put('/aprendiz/:id', mdAutenticacion.verificaToken, aprendizController.updateAprendiz);

// ==========================================
// crear un nuevo estado 
// ==========================================
app.post('/aprendiz/', mdAutenticacion.verificaToken, aprendizController.saveAprendiz);

//====================================================
//desabilitar estado
//=====================================================

app.put('/aprendiz/disponible/:id', mdAutenticacion.verificaToken, aprendizController.changeAvailability);

module.exports = app;