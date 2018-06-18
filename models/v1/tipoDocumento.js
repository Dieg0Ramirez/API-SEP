var mongoose = require('mongoose');

var uniqueValidator = require('mongoose-unique-validator');

var Schema = mongoose.Schema;

var tipoDocumentoSchema = new Schema({
    nombre: {
        type: String,
        unique: true,
        required: [true, 'El nombre es necesario']
    },
    disponible: {
        type: Boolean,
        default: true
    },
});

tipoDocumentoSchema.plugin(uniqueValidator, { message: 'El nombre del tipo de documento debe ser unico' });

module.exports = mongoose.model('TipoDocumento', tipoDocumentoSchema);