var express = require('express');
var app = express();

var tipoDucumentoController = require('../../controllers/v1/tipoDocumentoController');
// ==========================================
// obtener todos los estados
// ==========================================
app.get('/tipoDocumento/', tipoDucumentoController.getTipoDocumento);

module.exports = app;