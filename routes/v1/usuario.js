var express = require('express');
var app = express();
var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');

var usuarioModel = require('./../../models/v1/usuario');
var mdAutenticacion = require('./../../middlewares/v1/autenticacion');

// ==========================================
// obtener todos los usuarios
// ==========================================
app.get('/usuario/', mdAutenticacion.verificaToken, (req, res) => {

    usuarioModel.find({}).exec(
        (err, usuarios) => {
            if (err) {
                return res.status(500).json({
                    ok: false,
                    mensaje: 'Error cargando usuarios',
                    errors: err
                });
            }

            res.status(200).json({
                ok: true,
                usuarios: usuarios,
                otros: req.usuario
            });

        });
});

// ==========================================
// actualizar un usuario
// ==========================================
app.put('/usuario/:id', mdAutenticacion.verificaToken, (req, res) => {

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
        usuario.email = body.email;
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
});

// ==========================================
// crear un nuevo usuarios 
// ==========================================
// npm install mongoose-unique-validator --save =========== para las validaciones de correo

//si es necesario restringir la creaciond e usuarios
app.post('/usuario/', mdAutenticacion.verificaToken, (req, res) => {

    var body = req.body;

    var usuario = new usuarioModel({
        nombre: body.nombre,
        email: body.email,
        password: bcrypt.hashSync(body.password, 10),
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

});

// ==========================================
// borrar un usuario
// ==========================================
// app.delete('/:id', mdAutenticacion.verificaToken, (req, res) => {

//     var id = req.params.id;

//     usuarioModel.findByIdAndRemove(id, (err, usuarioBorrado) => {
//         if (err) {
//             return res.status(500).json({
//                 ok: false,
//                 mensaje: 'Error al borrar usuario',
//                 errors: err
//             });
//         }

//         if (!usuarioBorrado) {
//             return res.status(400).json({
//                 ok: false,
//                 mensaje: 'no existe un usuario con ese id',
//                 errors: err
//             });
//         }

//         res.status(200).json({
//             ok: true,
//             message: 'el siguiente usuario fue borrado',
//             usuario: usuarioBorrado
//         });

//     });

// });

module.exports = app;