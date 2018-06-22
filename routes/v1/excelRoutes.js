'use strict'

var express = require('express');
var app = express();
var excelController = require('./../../controllers/v1/excelController');

app.post("/excel/juicios/:nivelFormacion", excelController.juiciosEvaluativos);
// api.post("/excel/alternativaContrato", excelControllers.alternativaContrato);

module.exports = app;