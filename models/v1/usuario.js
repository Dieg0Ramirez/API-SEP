var mongoose = require('mongoose');

var uniqueValidator = require('mongoose-unique-validator');

var Schema = mongoose.Schema;

var roles_validos = {
    values: [
        'ROL_SEGUIMIENTO',
        'ROL_ADMIN',
        'ROL_SUPERADMIN'
    ],
    message: '{VALUE} no es un rol valido'
};

var usuarioSchema = new Schema({
    nombre: {
        type: String,
        required: [true, 'El nombre es necesario']
    },
    email: {
        type: String,
        unique: true,
        required: [true, 'El email es necesario']
    },
    password: {
        type: String,
        required: [true, 'La constraseña es necesaria']
    },
    rol: {
        type: String,
        default: 'ROL_SEGUIMIENTO',
        enum: roles_validos
    },
    disponible: {
        type: Boolean,
        default: true
    },
});

usuarioSchema.plugin(uniqueValidator, { message: 'El email debe ser unico' });

module.exports = mongoose.model('Usuario', usuarioSchema);