var express = require('express');
var app = express();
var estadoController = require('./../../controllers/v1/estadoController');
var mdAutenticacion = require('./../../middlewares/v1/autenticacion');

// ==========================================
// obtener todos los estados
// ==========================================
app.get('/estado/', mdAutenticacion.verificaToken, estadoController.getEstado);

// ==========================================
// actualizar un estado
// ==========================================
app.put('/estado/:id', mdAutenticacion.verificaToken, estadoController.updateEstado);

// ==========================================
// crear un nuevo estado 
// ==========================================
app.post('/estado/', mdAutenticacion.verificaToken, estadoController.saveEstado);



//====================================================
//desabilitar estado
//=====================================================

app.put('/estado/disponible/:id', mdAutenticacion.verificaToken, estadoController.changeAvailability);

module.exports = app;