var mongoose = require('mongoose');

var uniqueValidator = require('mongoose-unique-validator');

var Schema = mongoose.Schema;

var nivelFormcionSchema = new Schema({
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

nivelFormcionSchema.plugin(uniqueValidator, { message: 'El nombre del nivel de formación debe ser unico' });

module.exports = mongoose.model('NivelFormacion', nivelFormcionSchema);