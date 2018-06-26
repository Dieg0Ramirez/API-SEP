var mongoose = require('mongoose');

var uniqueValidator = require('mongoose-unique-validator');

var Schema = mongoose.Schema;

var aprendizSchema = new Schema({
    tipoDocumento: {
        type: Schema.ObjectId,
        ref: 'TipoDocumento',
        required: [true, 'El tipo de documento es necesario']
    },
    numeroDocumento: {
        type: String,
        unique: true,
        required: [true, 'El numero de documento es necesario']
    },
    ficha: {
        type: Schema.ObjectId,
        ref: 'Ficha',
        required: [true, 'La ficha es necesaria']
    },
    alternativa: {
        type: Schema.ObjectId,
        ref: 'Alternativa',
        required: [true, 'La alternativa de etapa práctica es necesaria']
    },
    nombre: {
        type: String,
        required: [true, 'El nombre es necesario']
    },
    apellido: {
        type: String,
        required: [true, 'El apellido es necesario']
    },
    genero: {
        type: String
    },
    telefono: {
        type: String
    },
    celular: {
        type: String
    },
    correo: {
        type: String
    },
    disponible: {
        type: Boolean,
        default: true
    },
    estado: {
        type: Schema.ObjectId,
        ref: 'Estado',
        required: [true, 'El Estado es necesario']
    },
});

aprendizSchema.plugin(uniqueValidator, { message: 'El numero de documento debe ser unico' });

module.exports = mongoose.model('Aprendiz', aprendizSchema);