var express = require('express');
var app = express();
var jwt = require('jsonwebtoken');

var cadenaController = require('../../controllers/v1/cadenaController');
var mdAutenticacion = require('./../../middlewares/v1/autenticacion');

// ==========================================
// obtener todos los estados
// ==========================================
app.get('/cadena/', mdAutenticacion.verificaToken, cadenaController.getCadenas);

// ==========================================
// actualizar un cadena
// ==========================================
app.put('/cadena/:id', mdAutenticacion.verificaToken, cadenaController.updateCadena);

// ==========================================
// crear un nuevo cadena 
// ==========================================

app.post('/cadena/', mdAutenticacion.verificaToken, cadenaController.saveCadena);

// ==========================================
// borrar un usuario
// ==========================================
app.put('/cadena/disponible/:id', mdAutenticacion.verificaToken, cadenaController.changeAvailability);

module.exports = app;