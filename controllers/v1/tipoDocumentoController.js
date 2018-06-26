var tipoDocumentoModel = require('../../models/v1/tipoDocumentoModel');

function getTipoDocumento(req, res) {

    tipoDocumentoModel.find({}).exec(
        (err, tipoDocumento) => {
            if (err) {
                return res.status(500).json({
                    ok: false,
                    mensaje: 'Error al cargando los tipo de documento',
                    errors: err
                });
            }

            res.status(200).json({
                ok: true,
                tipoDocumento: tipoDocumento
            });

        });
}

function saveTipoDocumento(req, res) {

    var body = req.body;

    var tipoDocumento = new tipoDocumentoModel({
        nombre: body.nombre
    });

    tipoDocumento.save((err, tipoDocumentoGuardado) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                mensaje: 'Error al crear el tipo de documento',
                errors: err
            });
        }

        res.status(201).json({
            ok: true,
            tipoDocumento: tipoDocumentoGuardado,
        });

    });

}

function updateTipoDocumento(req, res) {

    var id = req.params.id;
    var body = req.body;

    tipoDocumentoModel.findByIdAndUpdate(id, body, { new: true }, (err, tipoDocumento) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                mensaje: 'Error al buscar el tipo de documento',
                errors: err
            });
        }

        if (!tipoDocumento) {
            return res.status(400).json({
                ok: false,
                mensaje: 'El tipo de documento con el id ' + id + ' no existe',
                errors: err
            });
        }

        tipoDocumento.nombre = body.nombre;
        tipoDocumento.save((err, tipoDActualizado) => {

            if (err) {
                return res.status(400).json({
                    ok: false,
                    mensaje: 'Error al actualizar cadena',
                    errors: err
                });
            }
            res.status(200).json({
                ok: true,
                tipoDocumento: tipoDActualizado
            });

        });

    });
}

function changeAvailability(req, res) {

    var id = req.params.id;
    var body = req.body;

    tipoDocumentoModel.findOneAndUpdate({ "_id": id }, { "$set": { "disponible": body.disponible } }, (err, tipoDActualizado) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                mensaje: 'Error al actualizar la disponibilidad del estado',
                errors: err
            });
        }

        if (!tipoDActualizado) {
            return res.status(400).json({
                ok: false,
                mensaje: 'No existe un estado con ese id',
                errors: err
            });
        }

        res.status(200).json({
            ok: true,
            message: 'El siguiente estado fue actualizada',
            tipoDocumento: tipoDActualizado
        });

    });

}

module.exports = {
    getTipoDocumento: getTipoDocumento,
    saveTipoDocumento: saveTipoDocumento,
    updateTipoDocumento: updateTipoDocumento,
    changeAvailability: changeAvailability
}