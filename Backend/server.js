// const express = require("express");
// const app = express();
// const port = 4000;
// const path = require('path');

// const {sequelize} = require("./models");
// const apiRoutes = require("./routes/medicos");
// const apiRoutes = require("./routes/citas");

// app.set('view engine', 'ejs');
// app.set('views', path.join(__dirname, 'views'));
// app.use(express.urlencoded({ extended: true }));

// app.use(express.json());
// app.use('/medicos', apiRoutes);

// sequelize.authenticate()
//     .then(() => console.log('Conexion a MySQL establecida con éxito'))
//     .catch(err => console.log('Error de conexión: ', err));

// app.listen(port, () => {
//     console.log(`Servidor express escuchando en http://localhost:${port}`)
//     const cors = require('cors');

// app.use(cors({
//   origin: 'http://localhost:3000', // ✅ permite que el frontend acceda
//   credentials: true
// }));

// });
const express = require("express");
const app = express();
const port = 4000;
const path = require('path');
const cors = require('cors');

const { sequelize } = require("./models");

// 🔧 Rutas
const pacientesRoutes = require("./routes/pacientes");
const medicosRoutes = require("./routes/medicos");
const citasRoutes = require("./routes/citas");

// 🧠 Middleware global
app.use(cors({ origin: 'http://localhost:3000', credentials: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// 🧠 Vistas
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// ✅ Registro de rutas
app.use('/pacientes', pacientesRoutes);
app.use('/medicos', medicosRoutes);
app.use('/citas', citasRoutes);

// 📡 Conexión BD y servidor
sequelize.authenticate()
  .then(() => console.log('Conexión a MySQL establecida con éxito'))
  .catch(err => console.log('Error de conexión: ', err));

app.listen(port, () => {
  console.log(`Servidor express escuchando en http://localhost:${port}`);
});
