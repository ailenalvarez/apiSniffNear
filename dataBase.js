//Conexion a la base de datos
const mongoose = require('mongoose');

// Conexion con la base de datos
mongoose.connect( 'mongodb://127.0.0.1/pets' , {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})

module.exports = mongoose.connection;
