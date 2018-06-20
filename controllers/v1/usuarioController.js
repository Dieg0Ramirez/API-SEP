var express = require('express');
var app = express();
var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
usuarioModel = require('../../models/v1/usuarioModel');

function getUsuario(req, res) {

    usuarioModel.find({}, 'nombre email rol disponible').exec(
        (err, usuarios) => {
            if (err) {
                return res.status(500).json({
                    ok: false,
                    mensaje: 'Error cargando usuarios',
                    errors: err
                });
            }

            usuarioModel.count({}, (err, conteo) => {
                res.status(200).json({
                    ok: true,
                    usuarios: usuarios,
                    otros: req.usuario,
                    total: conteo,
                });

            });

        });
}

function updateUsuario(req, res) {

    var id = req.params.id
    var body = req.body;

    usuarioModel.findById(id, (err, usuario) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                mensaje: 'Error al buscar usuario',
                errors: err
            });
        }

        if (!usuario) {
            return res.status(400).json({
                ok: false,
                mensaje: 'el usuario con el id ' + id + ' no existe',
                errors: err
            });
        }
        usuario.nombre = body.nombre;
        usuario.save((err, usuarioGuardado) => {

            if (err) {
                return res.status(400).json({
                    ok: false,
                    mensaje: 'Error al actualizar usuario',
                    errors: err
                });
            }

            usuarioGuardado.password = '🙂'; // se mostrar esto como la contraseña, pero solo es en la respuesta del guardado

            res.status(200).json({
                ok: true,
                usuario: usuarioGuardado
            });

        });

    });
}

function saveUsuario(req, res) {

    var body = req.body;

    var usuario = new usuarioModel({
        nombre: body.nombre,
        email: body.email,
        password: bcrypt.hashSync(body.password, 10),
        rol: body.rol,
    });

    usuario.save((err, usuarioGuardado) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                mensaje: 'Error al crear usuario',
                errors: err
            });
        }

        res.status(201).json({
            ok: true,
            usuario: usuarioGuardado,
            usuariotoken: req.usuario
        });

    });

}

function changeAvailability(req, res) {

    var id = req.params.id;
    var body = req.body;


    usuarioModel.findOneAndUpdate({ "_id": id }, { "$set": { "disponible": body.disponible } }, (err, usuarioActualizado) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                mensaje: 'Error al actualizar la disponibilidad del usuario',
                errors: err
            });
        }

        if (!usuarioActualizado) {
            return res.status(400).json({
                ok: false,
                mensaje: 'No existe un usuario con ese id',
                errors: err
            });
        }

        res.status(200).json({
            ok: true,
            message: 'El siguiente usuario fue actualizada',
            usuario: usuarioActualizado
        });

    });

}
module.exports = {
    getUsuario: getUsuario,
    updateUsuario: updateUsuario,
    saveUsuario: saveUsuario,
    changeAvailability: changeAvailability

}