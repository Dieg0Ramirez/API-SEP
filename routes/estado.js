var express = require('express');
var app = express();
var bcrypt = require('bcryptjs');
var Estado = require('../models/estado')

var jwt = require('jsonwebtoken');
var mdAutenticacion = require('../middlewares/autenticacion');

// ==========================================
// obtener todos los estados
// ==========================================
app.get('/', (req, res, next) => {

    Estado.find({}).exec(
        (err, estados) => {
            if (err) {
                return res.status(500).json({
                    ok: false,
                    mensaje: 'Error cargando estados',
                    errors: err
                });
            }

            res.status(200).json({
                ok: true,
                estados: estados
            });

        });
});

// ==========================================
// actualizar un estado
// ==========================================
app.put('/:id', mdAutenticacion.verificaToken, (req, res) => {

    var id = req.params.id
    var body = req.body;

    Estado.findById(id, (err, estado) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                mensaje: 'Error al buscar estado',
                errors: err
            });
        }

        if (!estado) {
            return res.status(400).json({
                ok: false,
                mensaje: 'el estado con el id ' + id + ' no existe',
                errors: err
            });
        }

        estado.nombre = body.nombre;
        estado.save((err, estadoGuardado) => {

            if (err) {
                return res.status(400).json({
                    ok: false,
                    mensaje: 'Error al actualizar estado',
                    errors: err
                });
            }
            res.status(200).json({
                ok: true,
                estado: estadoGuardado
            });

        });

    });
});

// ==========================================
// crear un nuevo estado 
// ==========================================
// npm install mongoose-unique-validator --save =========== para las validaciones de correo

//si es necesario restringir la creaciond e usuarios
app.post('/', mdAutenticacion.verificaToken, (req, res) => {

    var body = req.body;

    var estado = new Estado({
        nombre: body.nombre
    });

    estado.save((err, estadoGuardado) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                mensaje: 'Error al crear usuario',
                errors: err
            });
        }

        res.status(201).json({
            ok: true,
            estado: estadoGuardado,
        });

    });

});

// ==========================================
// borrar un usuario
// ==========================================
app.delete('/:id', mdAutenticacion.verificaToken, (req, res) => {

    var id = req.params.id;

    Estado.findByIdAndRemove(id, (err, estadoBorrado) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                mensaje: 'Error al borrar estado',
                errors: err
            });
        }

        if (!estadoBorrado) {
            return res.status(400).json({
                ok: false,
                mensaje: 'no existe un estado con ese id',
                errors: err
            });
        }

        res.status(200).json({
            ok: true,
            message: 'el siguiente estado fue borrado',
            estado: estadoBorrado
        });

    });

});

module.exports = app;