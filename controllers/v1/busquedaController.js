var express = require('express');
var app = express();
usuarioModel = require('./../../models/v1/usuario');

function getUsuario(req, res) {

    var busqueda = req.params.busqueda;
    var exRe = new RegExp(busqueda, 'i');

    return new Promise((resolve, reject) => {

        usuarioModel.find({}, 'nombre email role disponible')
            .or([{ 'nombre': exRe }, { 'email': exRe }])
            .exec((err, usuarios) => {
                if (err) {
                    reject('error al cargar usuarios', err);
                } else {
                    resolve(usuarios);
                }
            })

    });

}

module.exports = getUsuario;