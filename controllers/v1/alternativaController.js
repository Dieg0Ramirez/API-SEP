var alternativaModel = require('../../models/v1/alternativaModel');

function getAlternativas(req, res) {

    alternativaModel.find({}).exec(
        (err, alternativas) => {
            if (err) {
                return res.status(500).json({
                    ok: false,
                    mensaje: 'Error cargando alternativas',
                    errors: err
                });
            }

            res.status(200).json({
                ok: true,
                alternativas: alternativas
            });

        });
}

function updateAlternativa(req, res) {

    var id = req.params.id;
    var body = req.body;

    alternativaModel.findByIdAndUpdate(id, body, { new: true }, (err, alternativa) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                mensaje: 'Error al buscar alternativa',
                errors: err
            });
        }

        if (!alternativa) {
            return res.status(400).json({
                ok: false,
                mensaje: 'La alternativa con el id ' + id + ' no existe',
                errors: err
            });
        }

        alternativa.nombre = body.nombre;
        alternativa.save((err, alternativaActualizada) => {

            if (err) {
                return res.status(400).json({
                    ok: false,
                    mensaje: 'Error al actualizar alternativa',
                    errors: err
                });
            }
            res.status(200).json({
                ok: true,
                alternativa: alternativaActualizada
            });

        });

    });
}

function saveAlternativa(req, res) {

    var body = req.body;

    var alternativa = new alternativaModel({
        nombre: body.nombre
    });

    alternativa.save((err, alternativaGuardada) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                mensaje: 'Error al crear la alternativa',
                errors: err
            });
        }

        res.status(201).json({
            ok: true,
            alternativa: alternativaGuardada,
        });

    });

}

function changeAvailability(req, res) {

    var id = req.params.id;
    var body = req.body;

    alternativaModel.findOneAndUpdate({ "_id": id }, { "$set": { "disponible": body.disponible } }, (err, alternativaActualizada) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                mensaje: 'Error al actualizar la disponibilidad de la alternativa',
                errors: err
            });
        }

        if (!alternativaActualizada) {
            return res.status(400).json({
                ok: false,
                mensaje: 'No existe un alternativa con ese id',
                errors: err
            });
        }

        res.status(200).json({
            ok: true,
            message: 'La siguiente alternativa fue actualizada',
            alternativa: alternativaActualizada
        });

    });

}

module.exports = {
    getAlternativas: getAlternativas,
    updateAlternativa: updateAlternativa,
    saveAlternativa: saveAlternativa,
    changeAvailability: changeAvailability
};