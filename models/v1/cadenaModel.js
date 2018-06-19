var mongoose = require('mongoose');

var uniqueValidator = require('mongoose-unique-validator');

var Schema = mongoose.Schema;

var cadenaSchema = new Schema({
    nombre: {
        type: String,
        unique: true,
        required: [true, 'la cadena es necesario']
    },
    disponible: {
        type: Boolean,
        default: true
    },

});

cadenaSchema.plugin(uniqueValidator, { message: 'El nombre de la cadena debe ser unico' });

module.exports = mongoose.model('Cadena', cadenaSchema);