'use strict'

var fs = require('fs');
var path = require('path');

var async = require('async');
var multer = require('multer');
var excelToJson = require('convert-excel-to-json');

var nivelFormacionModel = require('../../models/v1/nivelFormacionModel');
var programaModel = require('../../models/v1/programaModel');
var fichaModel = require('../../models/v1/fichaModel');
var tipoDocumentoModel = require('../../models/v1/tipoDocumentoModel');
var estadoModel = require('../../models/v1/estadoModel');
var aprendizModel = require('../../models/v1/aprendizModel');

var storage = multer.diskStorage({ //Configuración para almacenar en multer
    destination: function (req, file, cb) {
        cb(null, './uploads/excel')
    },
    filename: function (req, file, cb) {
        var datetimestamp = Date.now();
        console.log(file.fieldname);
        cb(null, file.fieldname + '-' + datetimestamp + '.' + file.originalname.split('.')[file.originalname.split('.').length - 1])
    }
});

var upload = multer({ //Configuraciones de multer
    storage: storage,
    fileFilter: function (req, file, callback) { //Archivo a procesar
        if (['xls', 'xlsx'].indexOf(file.originalname.split('.')[file.originalname.split('.').length - 1]) === -1) {
            return callback(new Error('La extensión no cumple'));
        }
        callback(null, true);
    }
}).single('file');


function juiciosEvaluativos(req, res) {

    var io = req.app.get('socketio');

    var nivelFormacion = req.params.nivelFormacion;

    var exceltojson;

    upload(req, res, function (err) {
        if (err) {

            res.status(500).send({
                message: "La extensión no es correcta",
                object: null,
                response: false
            });

            return;
        }

        /** multer verifica si existe el parametro tipo archivo llamado req.file */
        if (!req.file) {

            res.status(404).send({
                message: "No has subido ningún archivo de excel...",
                object: null,
                response: false
            });

            return;
        }

        try {

            var resultJSON = excelToJson({
                sourceFile: req.file.path,
                header: {
                    rows: 2
                }
            }, function (err, result) {
                res.status(500).send({
                    message: "Archivo de excel corrupto, no se pudo procesar",
                    object: null,
                    response: false
                });
            });

            if (resultJSON['Hoja'] != undefined) {
                if (resultJSON['Hoja'].length > 0) {

                    var hoja = resultJSON['Hoja'];

                    var encabezado = hoja.filter(function (fila, index) {
                        if (index <= 10) {
                            return fila;
                        }
                    });

                    var aprendices = hoja.filter(function (fila, index) {
                        if (index > 10 && fila.E == 'EN FORMACION') {
                            return fila;
                        }
                    });

                    aprendices = removeDuplicates(aprendices, "B");

                    var excelProcesado = [];
                    var sizeExcel = aprendices.length;

                    res.status(200).send({
                        message: "El archivo de Excel se esta procesando",
                        object: null,
                        response: true
                    });

                    var iteracion = 0;

                    async.waterfall([

                        //Guardar Nivel de Formación
                        next => {

                            nivelFormacionModel.findOneAndUpdate({ nombre: nivelFormacion },
                                {
                                    nombre: nivelFormacion,
                                    disponible: true

                                }, { upsert: true, 'new': true }, (error, nivelFormacionStored) => {

                                    next(null, nivelFormacionStored);

                                });
                        },

                        //Guardar Programa de Formación
                        (nivelFormacion, next) => {

                            programaModel.findOneAndUpdate({ nombre: encabezado[3].C },
                                {
                                    nombre: encabezado[3].C,
                                    nivelFormacion: nivelFormacion._id,
                                    disponible: true

                                }, { upsert: true, 'new': true }, (error, programaStored) => {

                                    next(null, programaStored);

                                });

                        },

                        //Guardar Ficha de Formación
                        (programa, next) => {

                            fichaModel.findOneAndUpdate({ numeroFicha: encabezado[0].C }, {

                                numeroFicha: encabezado[0].C,
                                programa: programa._id,
                                fechaInicio: encabezado[5].C,
                                fechaFin: encabezado[6].C,
                                modalidad: encabezado[7].C,
                                centro: encabezado[9].C,
                                disponible: true

                            }, { upsert: true, 'new': true }, (error, fichaStored) => {

                                next(null, fichaStored);

                            });

                        },

                        (ficha, next) => {

                            async.forEachSeries(aprendices, (registro, cb) => {

                                async.waterfall([

                                    //Guarda el Tipo de Documento
                                    next => {

                                        tipoDocumentoModel.findOneAndUpdate({ nombre: registro['A'] },
                                            {
                                                nombre: registro['A'],
                                                disponible: true
                                            },
                                            { upsert: true, 'new': true }, (error, tipoDocumentoStored) => {

                                                next(null, tipoDocumentoStored);

                                            });
                                    },

                                    //Guarda el estado 'Sin Seguimiento' para los aprendices
                                    (tipoDocumento, next) => {

                                        estadoModel.findOneAndUpdate({ nombre: 'Sin Seguimiento' },
                                            {
                                                nombre: 'Sin Seguimiento',
                                                disponible: true
                                            },
                                            { upsert: true, 'new': true }, (error, estadoStored) => {

                                                next(null, tipoDocumento, estadoStored);

                                            });
                                    },

                                    //Guarda el aprendiz
                                    (tipoDocumento, estado, next) => {

                                        aprendizModel.findOneAndUpdate({ numeroDocumento: registro['B'] },
                                            {
                                                tipoDocumento: tipoDocumento._id,
                                                numeroDocumento: registro['B'],
                                                ficha: ficha._id,
                                                nombre: registro['C'],
                                                apellido: registro['D'],
                                                genero: 'Sin Especificar',
                                                telefono: 'Sin Especificar',
                                                celular: 'Sin Especificar',
                                                correo: 'Sin Especificar',
                                                disponible: true,
                                                estado: estado._id

                                            }, { upsert: true, 'new': true }, (error, aprendizStored) => {

                                                var result = {
                                                    "tipoDocumento": tipoDocumento,
                                                    "aprendiz": aprendizStored
                                                }
                                                next(null, result);

                                            });
                                    },

                                ], (error, result) => {
                                    excelProcesado.push(result);

                                    cb(null);

                                    iteracion++;

                                    result.sizeExcel = sizeExcel;
                                    result.iteracion = iteracion;

                                    io.emit('processRowExcelAprendices', result);

                                    if (iteracion == sizeExcel) {
                                        next(null);
                                    }
                                });

                            });

                        }, () => {

                            var result = {
                                'ficha': encabezado[0].C,
                                'programa': encabezado[3].C,
                                'fechaInicio': encabezado[5].C,
                                'fechaFin': encabezado[6].C,
                                'modalidad': encabezado[7].C,
                                'centro': encabezado[9].C,
                                'aprendices': aprendices,
                                'sincronizados': aprendices.length
                            };

                            // res.status(200).send({
                            //     message: "El archivo de Excel se esta procesando",
                            //     object: result,
                            //     response: true
                            // });

                            io.emit('processFullExcelAprendices', result);
                        }
                    ]);

                } else {

                    res.status(500).send({
                        message: "Archivo de excel corrupto, no cuenta con registros para almacenar",
                        object: null,
                        response: false
                    });

                }
            } else {
                res.status(500).send({
                    message: "Archivo de excel corrupto, no se encuentra la hoja llamada 'Hoja'",
                    object: null,
                    response: false
                });
            }

            fs.unlinkSync(req.file.path);

        } catch (e) {

            res.status(500).send({
                message: "Archivo de excel corrupto",
                object: { exceltojson: exceltojson },
                response: false
            });

        }
    });
}

function removeDuplicates(originalArray, prop) {
    var newArray = [];
    var lookupObject = {};

    for (var i in originalArray) {
        lookupObject[originalArray[i][prop]] = originalArray[i];
    }

    for (i in lookupObject) {
        newArray.push(lookupObject[i]);
    }
    return newArray;
}

module.exports = {
    juiciosEvaluativos
};