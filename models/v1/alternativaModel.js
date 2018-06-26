var mongoose = require('mongoose');

var uniqueValidator = require('mongoose-unique-validator');

var Schema = mongoose.Schema;

var alternativaSchema = new Schema({
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

alternativaSchema.plugin(uniqueValidator, { message: 'El nombre de la alternativa debe ser unico' });

module.exports = mongoose.model('Alternativa', alternativaSchema);