var mongoose = require('mongoose');

var uniqueValidator = require('mongoose-unique-validator');

var Schema = mongoose.Schema;

var cadenaSchema = new Schema({
    nombre: { type: String, required: [true, 'la cadena es necesario'] },

});

module.exports = mongoose.model('Cadena', cadenaSchema);