var tipoDocumentoModel = require('./../../models/v1/tipoDocumento');

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

module.exports = {
    getTipoDocumento: getTipoDocumento
}