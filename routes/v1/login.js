var express = require('express');
var app = express();
var loginController = require('./../../controllers/v1/loginController');


app.post('/login/', loginController.createLogin);

module.exports = app;