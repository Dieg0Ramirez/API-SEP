var programaModel = require('../../models/v1/programaModel');

function getProgramas(req, res) {

    programaModel.find({}).populate({ path: 'nivelFormacion' }).exec(
        (err, programas) => {
            if (err) {
                return res.status(500).json({
                    ok: false,
                    mensaje: 'Error cargando programas',
                    errors: err
                });
            }

            programaModel.count({}, (err, conteo) => {
                res.status(200).json({
                    ok: true,
                    programas: programas,
                    total: conteo,
                });
            });

        });
}

function updatePrograma(req, res) {

    var id = req.params.id;
    var body = req.body;

    programaModel.findByIdAndUpdate(id, body, { new: true }, (err, programa) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                mensaje: 'Error al buscar el programa',
                errors: err
            });
        }

        if (!programa) {
            return res.status(400).json({
                ok: false,
                mensaje: 'El programa con el id ' + id + ' no existe',
                errors: err
            });
        }

        programa.nombre = body.nombre;
        programa.nivelFormacion = body.nivelFormacion;

        programa.save((err, programaActualizado) => {

            if (err) {
                return res.status(400).json({
                    ok: false,
                    mensaje: 'Error al actualizar programa',
                    errors: err
                });
            }
            res.status(200).json({
                ok: true,
                programa: programaActualizado
            });

        });

    });
}

function savePrograma(req, res) {

    var body = req.body;

    var programa = new programaModel({
        nombre: body.nombre,
        nivelFormacion: body.nivelFormacion
    });

    programa.save((err, programaGuardado) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                mensaje: 'Error al crear programa',
                errors: err
            });
        }

        res.status(201).json({
            ok: true,
            programa: programaGuardado,
        });

    });

}

function changeAvailability(req, res) {

    var id = req.params.id;
    var body = req.body;

    programaModel.findOneAndUpdate({ "_id": id }, { "$set": { "disponible": body.disponible } }, (err, programaActualizado) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                mensaje: 'Error al actualizar la disponibilidad del programa',
                errors: err
            });
        }

        if (!programaActualizado) {
            return res.status(400).json({
                ok: false,
                mensaje: 'No existe el programa con ese id',
                errors: err
            });
        }

        res.status(200).json({
            ok: true,
            message: 'El siguiente programa fue actualizado',
            programa: programaActualizado
        });

    });

}

module.exports = {
    getProgramas: getProgramas,
    updatePrograma: updatePrograma,
    savePrograma: savePrograma,
    changeAvailability: changeAvailability
};