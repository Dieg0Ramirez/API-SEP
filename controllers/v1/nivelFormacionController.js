var nivelFormacionModel = require('../../models/v1/nivelFormacionModel');

function getNivelFormacion(req, res) {

    nivelFormacionModel.find({}).exec(
        (err, nivelFormacion) => {
            if (err) {
                return res.status(500).json({
                    ok: false,
                    mensaje: 'Error al cargando los niveles de formación',
                    errors: err
                });
            }

            res.status(200).json({
                ok: true,
                nivelFormacion: nivelFormacion
            });

        });
}

function updateNivelFormacion(req, res) {

    var id = req.params.id;
    var body = req.body;

    nivelFormacionModel.findByIdAndUpdate(id, body, { new: true }, (err, nivelFormacion) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                mensaje: 'Error al buscar el nivel de formacion',
                errors: err
            });
        }

        if (!nivelFormacion) {
            return res.status(400).json({
                ok: false,
                mensaje: 'El nivel de formacion con el id ' + id + ' no existe',
                errors: err
            });
        }

        nivelFormacion.nombre = body.nombre;
        nivelFormacion.save((err, nivelFormacionActualizado) => {

            if (err) {
                return res.status(400).json({
                    ok: false,
                    mensaje: 'Error al actualizar el nivel de formacion',
                    errors: err
                });
            }
            res.status(200).json({
                ok: true,
                nivelFormacion: nivelFormacionActualizado
            });

        });

    });
}

function saveNivelFormacion(req, res) {

    var body = req.body;

    var nivelFormacion = new nivelFormacionModel({
        nombre: body.nombre
    });

    nivelFormacion.save((err, nivelFormacionGuardado) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                mensaje: 'Error al crear el nivel de formacion',
                errors: err
            });
        }

        res.status(201).json({
            ok: true,
            nivelFormacion: nivelFormacionGuardado,
        });

    });

}

function changeAvailability(req, res) {

    var id = req.params.id;
    var body = req.body;

    nivelFormacionModel.findOneAndUpdate({ "_id": id }, { "$set": { "disponible": body.disponible } }, (err, nivelFormacionActualizado) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                mensaje: 'Error al actualizar la disponibilidad del nivel de formacion',
                errors: err
            });
        }

        if (!nivelFormacionActualizado) {
            return res.status(400).json({
                ok: false,
                mensaje: 'No existe el nivel de formacion con ese id',
                errors: err
            });
        }

        res.status(200).json({
            ok: true,
            message: 'El siguiente nivel de formacion fue actualizado',
            nivelFormacion: nivelFormacionActualizado
        });

    });

}

module.exports = {
    getNivelFormacion: getNivelFormacion,
    updateNivelFormacion: updateNivelFormacion,
    saveNivelFormacion: saveNivelFormacion,
    changeAvailability: changeAvailability
}