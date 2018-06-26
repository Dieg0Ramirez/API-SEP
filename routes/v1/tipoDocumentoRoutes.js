var express = require('express');
var app = express();

var tipoDucumentoController = require('../../controllers/v1/tipoDocumentoController');
// ==========================================
// obtener todos los estados
// ==========================================
app.get('/tipoDocumento/', tipoDucumentoController.getTipoDocumento);
// ==========================================
// guardar tipo de documento
// ==========================================
app.post('/tipoDocumento', tipoDucumentoController.saveTipoDocumento);
// ==========================================
// actualizar tipo de documento
// ==========================================
app.put('/tipoDocumento/:id', tipoDucumentoController.updateTipoDocumento);
// ==========================================
// actualizar tipo de documento
// ==========================================
app.put('/tipoDocumento/disponible/:id', tipoDucumentoController.changeAvailability);

module.exports = app;