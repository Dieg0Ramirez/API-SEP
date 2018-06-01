var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');

//Inicializar variable
var app = express();

//body parser
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())


//importar rutas
var appRoutes = require('./routes/app');
var usuarioRoutes = require('./routes/usuario');
var loginRoutes = require('./routes/login');


//conexion a la base de datos

var hostMongo = 'localhost';
var portMongo = '27017';

mongoose.connection.openUri(`mongodb://${hostMongo}:${portMongo}/seguimiento_sepDB`, (err, res) => {
    if (err) throw err;
    console.log('Base de datos: \x1b[32m%s\x1b[0m', 'online');

});

//rutas
app.use('/login', loginRoutes);
app.use('/usuario', usuarioRoutes);
app.use('/', appRoutes);



//activar servidor

app.listen(3000, () => {
    console.log('Corriendo puerto 3000: \x1b[32m%s\x1b[0m', 'online');
});