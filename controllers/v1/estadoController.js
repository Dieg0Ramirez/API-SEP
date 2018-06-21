var estadoModel = require('../../models/v1/estadoModel');

function getEstado(req, res) {

    estadoModel.find({}).exec(
        (err, estados) => {
            if (err) {
                return res.status(500).json({
                    ok: false,
                    mensaje: 'Error al cargar los estados',
                    errors: err
                });
            }

            res.status(200).json({
                ok: true,
                estados: estados
            });

        });
}

function updateEstado(req, res) {

    var id = req.params.id
    var body = req.body;

    estadoModel.findByIdAndUpdate(id, body, { new: true }, (err, estado) => {
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
                    mensaje: 'Error al actualizar el estado',
                    errors: err
                });
            }
            res.status(200).json({
                ok: true,
                estado: estadoGuardado
            });

        });

    });
}

function saveEstado(req, res) {

    var body = req.body;

    var estado = new estadoModel({
        nombre: body.nombre
    });

    estado.save((err, estadoGuardado) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                mensaje: 'Error al crear estado',
                errors: err
            });
        }

        res.status(201).json({
            ok: true,
            estado: estadoGuardado,
        });

    });

}

function changeAvailability(req, res) {

    var id = req.params.id;
    var body = req.body;

    estadoModel.findOneAndUpdate({ "_id": id }, { "$set": { "disponible": body.disponible } }, (err, estadoActualizado) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                mensaje: 'Error al actualizar la disponibilidad del estado',
                errors: err
            });
        }

        if (!estadoActualizado) {
            return res.status(400).json({
                ok: false,
                mensaje: 'No existe un estado con ese id',
                errors: err
            });
        }

        res.status(200).json({
            ok: true,
            message: 'El siguiente estado fue actualizada',
            estado: estadoActualizado
        });

    });

}

function deleteEstado(req, res) {

    var id = req.params.id;

    estadoModel.findByIdAndRemove(id, (err, estadoBorrado) => {
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
                mensaje: 'No existe un estado con ese id',
                errors: err
            });
        }

        res.status(200).json({
            ok: true,
            message: 'El siguiente estado fue borrado',
            estado: estadoBorrado
        });

    });

}
module.exports = {
    getEstado: getEstado,
    updateEstado: updateEstado,
    saveEstado: saveEstado,
    deleteEstado: deleteEstado,
    changeAvailability: changeAvailability
}