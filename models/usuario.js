var mongoose = require('mongoose');

var uniqueValidator = require('mongoose-unique-validator');

var Schema = mongoose.Schema;

var usuarioSchema = new Schema({
    nombre: { type: String, required: [true, 'El nombre es necesario'] },
    email: { type: String, unique: true, required: [true, 'El email es necesario'] },
    password: { type: String, required: [true, 'La constraseña es necesaria'] }

});

usuarioSchema.plugin(uniqueValidator, { message: 'El email debe ser unico' });

module.exports = mongoose.model('Usuario', usuarioSchema);