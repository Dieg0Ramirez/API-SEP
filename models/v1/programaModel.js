var mongoose = require('mongoose');

var uniqueValidator = require('mongoose-unique-validator');

var Schema = mongoose.Schema;

var programaSchema = new Schema({
    nombre: {
        type: String,
        unique: true,
        required: [true, 'El nombre es necesario']
    },
    nivelFormacion: {
        type: Schema.ObjectId,
        ref: 'NivelFormacion',
        required: [true, 'El Nivel de Formación es necesario']
    },
    disponible: {
        type: Boolean,
        default: true
    },
});

programaSchema.plugin(uniqueValidator, { message: 'El nombre del programa debe ser unico' });

module.exports = mongoose.model('Programa', programaSchema);