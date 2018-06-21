var aprendizModel = require('../../models/v1/aprendizModel');

function getAprendiz(req, res) {

    aprendizModel.find({}).exec(
        (err, aprendiz) => {
            if (err) {
                return res.status(500).json({
                    ok: false,
                    mensaje: 'Error al cargar los aprendices',
                    errors: err
                });
            }

            res.status(200).json({
                ok: true,
                aprendiz: aprendiz
            });

        });
}

function updateAprendiz(req, res) {

    var id = req.params.id
    var body = req.body;

    aprendizModel.findByIdAndUpdate(id, body, { new: true }, (err, aprendiz) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                mensaje: 'Error al buscar el aprendiz',
                errors: err
            });
        }

        if (!aprendiz) {
            return res.status(400).json({
                ok: false,
                mensaje: 'El aprendiz con el id ' + id + ' no existe',
                errors: err
            });
        }

        S.tipoDocumento = body.tipoDocumento;
        aprendiz.numeroDocumento = body.numeroDocumento;
        aprendiz.ficha = body.ficha;
        aprendiz.nombre = body.nombre;
        aprendiz.apellido = body.apellido;
        aprendiz.genero = body.genero;
        aprendiz.telefono = body.telefono;
        aprendiz.celular = body.celular;
        aprendiz.correo = body.correo;

        aprendiz.save((err, apredizGuardado) => {

            if (err) {
                return res.status(400).json({
                    ok: false,
                    mensaje: 'Error al actualizar el aprendiz',
                    errors: err
                });
            }
            res.status(200).json({
                ok: true,
                aprendiza: apredizGuardado
            });

        });

    });
}

function saveAprendiz(req, res) {

    var body = req.body;

    var aprendiz = new aprendizModel({
        tipoDocumento = body.tipoDocumento,
        numeroDocumento = body.numeroDocumento,
        ficha = body.ficha,
        nombre = body.nombre,
        apellido = body.apellido,
        genero = body.genero,
        telefono = body.telefono,
        celular = body.celular,
        correo = body.correo
    });

    aprendiz.save((err, aprendizGuardado) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                mensaje: 'Error al guardar el aprendiz',
                errors: err
            });
        }

        res.status(201).json({
            ok: true,
            aprendiz: aprendizGuardado,
        });

    });

}

function changeAvailability(req, res) {

    var id = req.params.id;
    var body = req.body;

    aprendizModel.findOneAndUpdate({ "_id": id }, { "$set": { "disponible": body.disponible } }, (err, aprendizActualizado) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                mensaje: 'Error al actualizar la disponibilidad del aprendiz',
                errors: err
            });
        }

        if (!aprendizActualizado) {
            return res.status(400).json({
                ok: false,
                mensaje: 'No existe un aprendiz con ese id',
                errors: err
            });
        }

        res.status(200).json({
            ok: true,
            message: 'El siguiente aprendiz fue actualizado',
            aprendiz: aprendizActualizado
        });

    });

}

module.exports = {
    getAprendiz: getAprendiz,
    updateAprendiz: updateAprendiz,
    saveAprendiz: saveAprendiz,
    changeAvailability: changeAvailability
}