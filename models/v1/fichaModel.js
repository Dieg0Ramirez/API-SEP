var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var fichaSchema = new Schema({
    numeroFicha: {
        type: String,
        required: [true, 'la cadena es necesario']
    },
    programa: {
        type: String,
        required: [true, 'El programa es necesario']
    },
    nivelFormacion: {
        type: String,
        required: [true, 'El nivel es necesario']
    },
    fechaInicio: {
        type: String,
        required: [true, 'la fecha de inicio es necesario']
    },
    fechaFin: {
        type: String,
        required: [true, 'la fecha final es necesario']
    },
    modalidad: {
        type: String,
        required: [true, 'la modalidad es necesario']
    },
    centro: {
        type: String,
        required: [true, 'El centro es necesario']
    },
    disponible: {
        type: Boolean,
        default: true
    },

});

module.exports = mongoose.model('Ficha', fichaSchema);