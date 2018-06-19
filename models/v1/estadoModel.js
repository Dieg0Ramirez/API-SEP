var mongoose = require('mongoose');

var uniqueValidator = require('mongoose-unique-validator');

var Schema = mongoose.Schema;

var estadoSchema = new Schema({
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

estadoSchema.plugin(uniqueValidator, { message: 'El nombre del estado debe ser unico' });

module.exports = mongoose.model('Estado', estadoSchema);