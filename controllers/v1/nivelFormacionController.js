var nivelFromacionModel = require('../../models/v1/nivelFormacionModel');

function getNivelFormacion(req, res) {

    nivelFromacionModel.find({}).exec(
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

module.exports = {
    getNivelFormacion: getNivelFormacion
}