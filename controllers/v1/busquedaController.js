var express = require('express');
var app = express();
usuarioModel = require('../../models/v1/usuarioModel');

function searchUsuario(req, res) {

    var termino = req.params.termino;
    var exRe = new RegExp(termino, 'i');

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

module.exports = {
    searchUsuario: searchUsuario
};