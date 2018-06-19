var cadenaModel = require('../../models/v1/cadenaModel');

function getCadenas(req, res) {

    cadenaModel.find({}).exec(
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
}

function updateCadena(req, res) {

    var id = req.params.id;
    var body = req.body;

    cadenaModel.findById(id, (err, cadena) => {
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
                mensaje: 'La cadena con el id ' + id + ' no existe',
                errors: err
            });
        }

        cadena.nombre = body.nombre;
        cadena.save((err, cadenaActualizado) => {

            if (err) {
                return res.status(400).json({
                    ok: false,
                    mensaje: 'Error al actualizar cadena',
                    errors: err
                });
            }
            res.status(200).json({
                ok: true,
                cadena: cadenaActualizado
            });

        });

    });
}

function saveCadena(req, res) {

    var body = req.body;

    var cadena = new cadenaModel({
        nombre: body.nombre
    });

    cadena.save((err, cadenaGuardado) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                mensaje: 'Error al crear la cadena',
                errors: err
            });
        }

        res.status(201).json({
            ok: true,
            cadena: cadenaGuardado,
        });

    });

}

function changeAvailability(req, res) {

    var id = req.params.id;
    var body = req.body;

    cadenaModel.findOneAndUpdate({ "_id": id }, { "$set": { "disponible": body.disponible } }, (err, cadenaActualizado) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                mensaje: 'Error al actualizar la disponibilidad de la cadena',
                errors: err
            });
        }

        if (!cadenaActualizado) {
            return res.status(400).json({
                ok: false,
                mensaje: 'No existe un cadena con ese id',
                errors: err
            });
        }

        res.status(200).json({
            ok: true,
            message: 'La siguiente cadena fue actualizada',
            cadena: cadenaActualizado
        });

    });

}

module.exports = {
    getCadenas: getCadenas,
    updateCadena: updateCadena,
    saveCadena: saveCadena,
    changeAvailability: changeAvailability
};