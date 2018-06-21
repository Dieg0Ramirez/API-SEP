var fichaModel = require('../../models/v1/fichaModel');

function getFicha(req, res) {

    fichaModel.find({}).exec(
        (err, fichas) => {
            if (err) {
                return res.status(500).json({
                    ok: false,
                    mensaje: 'Error al cargar las fichas',
                    errors: err
                });
            }

            res.status(200).json({
                ok: true,
                fichas: fichas
            });

        });
}

function updateficha(req, res) {

    var id = req.params.id
    var body = req.body;

    fichaModel.findByIdAndUpdate(id, body, { new: true }, (err, ficha) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                mensaje: 'Error al buscar la ficha',
                errors: err
            });
        }

        if (!ficha) {
            return res.status(400).json({
                ok: false,
                mensaje: 'La ficha con el id ' + id + ' no existe',
                errors: err
            });
        }

        ficha.numeroFicha = body.numeroFicha;
        ficha.programa = body.programa;
        ficha.nivelFormacion = body.nivelFormacion;
        ficha.fechaInicio = body.fechaInicio;
        ficha.fechaFin = body.fechaFin;
        ficha.modalidad = body.modalidad;
        ficha.centro = body.centro;
        ficha.save((err, fichaGuardado) => {

            if (err) {
                return res.status(400).json({
                    ok: false,
                    mensaje: 'Error al actualizar el ficha',
                    errors: err
                });
            }
            res.status(200).json({
                ok: true,
                ficha: fichaGuardado
            });

        });

    });
}

function saveFicha(req, res) {

    var body = req.body;

    var ficha = new fichaModel({
        numeroFicha: body.numeroFicha,
        programa: body.programa,
        nivelFormacion: body.nivelFormacion,
        fechaInicio: body.fechaInicio,
        fechaFin: body.fechaFin,
        modalidad: body.modalidad,
        centro: body.centro,


    });

    ficha.save((err, fichaGuardado) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                mensaje: 'Error al crear la ficha',
                errors: err
            });
        }

        res.status(201).json({
            ok: true,
            ficha: fichaGuardado,
        });

    });

}

function changeAvailability(req, res) {

    var id = req.params.id;
    var body = req.body;

    fichaModel.findOneAndUpdate({ "_id": id }, { "$set": { "disponible": body.disponible } }, (err, fichaActualizado) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                mensaje: 'Error al actualizar la disponibilidad de la ficha',
                errors: err
            });
        }

        if (!fichaActualizado) {
            return res.status(400).json({
                ok: false,
                mensaje: 'No existe una ficha con ese id',
                errors: err
            });
        }

        res.status(200).json({
            ok: true,
            message: 'La siguiente ficha fue actualizada',
            ficha: fichaActualizado
        });

    });

}

module.exports = {
    getFicha: getFicha,
    updateficha: updateficha,
    saveFicha: saveFicha,
    changeAvailability: changeAvailability
}