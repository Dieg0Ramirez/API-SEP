var express = require('express');
var app = express();
var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
var loginController = require('./../../controllers/v1/loginController');


app.post('/login/', loginController.createLogin);

module.exports = app;