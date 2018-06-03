var mongoose = require('mongoose');

var uniqueValidator = require('mongoose-unique-validator');

var Schema = mongoose.Schema;

var estadoSchema = new Schema({
    nombre: {
        type: String,
        required: [true, 'El nombre es necesario']
    },
    disponible: {
        type: Boolean,
        default: true
    },
});

module.exports = mongoose.model('Estado', estadoSchema);