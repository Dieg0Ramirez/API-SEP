var express = require('express');
var app = express();
var bcrypt = require('bcryptjs');
var Cadena = require('../models/cadena')

var jwt = require('jsonwebtoken');
var mdAutenticacion = require('../middlewares/autenticacion');

// ==========================================
// obtener todos los estados
// ==========================================
app.get('/', (req, res, next) => {

    Cadena.find({}).exec(
        (err, cadenas) => {
            if (err) {
                return res.status(500).json({
                    ok: false,
                    mensaje: 'Error cargando estados',
                    errors: err
                });
            }

            res.status(200).json({
                ok: true,
                cadenas: cadenas
            });

        });
});

// ==========================================
// actualizar un cadena
// ==========================================
app.put('/:id', mdAutenticacion.verificaToken, (req, res) => {

    var id = req.params.id
    var body = req.body;

    Cadena.findById(id, (err, cadena) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                mensaje: 'Error al buscar cadena',
                errors: err
            });
        }

        if (!cadena) {
            return res.status(400).json({
                ok: false,
                mensaje: 'el cadena con el id ' + id + ' no existe',
                errors: err
            });
        }

        cadena.nombre = body.nombre;
        cadena.save((err, cadenaGuardado) => {

            if (err) {
                return res.status(400).json({
                    ok: false,
                    mensaje: 'Error al actualizar cadena',
                    errors: err
                });
            }
            res.status(200).json({
                ok: true,
                cadena: cadenaGuardado
            });

        });

    });
});

// ==========================================
// crear un nuevo cadena 
// ==========================================
// npm install mongoose-unique-validator --save =========== para las validaciones de correo

//si es necesario restringir la creaciond e usuarios
app.post('/', mdAutenticacion.verificaToken, (req, res) => {

    var body = req.body;

    var cadena = new Cadena({
        nombre: body.nombre
    });

    cadena.save((err, cadenaGuardado) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                mensaje: 'Error al crear usuario',
                errors: err
            });
        }

        res.status(201).json({
            ok: true,
            cadena: cadenaGuardado,
        });

    });

});

// ==========================================
// borrar un usuario
// ==========================================
app.delete('/:id', mdAutenticacion.verificaToken, (req, res) => {

    var id = req.params.id;

    Cadena.findByIdAndRemove(id, (err, cadenaBorrado) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                mensaje: 'Error al borrar cadena',
                errors: err
            });
        }

        if (!cadenaBorrado) {
            return res.status(400).json({
                ok: false,
                mensaje: 'no existe un cadena con ese id',
                errors: err
            });
        }

        res.status(200).json({
            ok: true,
            message: 'el siguiente cadena fue borrado',
            cadena: cadenaBorrado
        });

    });

});

module.exports = app;