const express = require("express");
const app = express();
const port = 3000;
const path = require('path');

const {sequelize} = require("./models");
const apiRoutes = require("./routes/medicos");

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.urlencoded({ extended: true }));

app.use(express.json());
app.use('/medicos', apiRoutes);

sequelize.authenticate()
    .then(() => console.log('Conexion a MySQL establecida con éxito'))
    .catch(err => console.log('Error de conexión: ', err));

app.listen(port, () => {
    console.log(`Servidor express escuchando en http://localhost:${port}`)
});