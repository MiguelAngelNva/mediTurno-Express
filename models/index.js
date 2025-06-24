const { Sequelize, DataTypes } = require('sequelize');

const sequelize = new Sequelize('mediturno', 'root', '', {
    host: "localhost",
    port: 3306,
    dialect: 'mysql'
});

const Medico = require('./medicos')(sequelize, DataTypes);
const Pacientes = require('./pacientes')(sequelize, DataTypes);
const Citas = require('./citas')(sequelize, DataTypes);
const Documentos = require('./documentos')(sequelize, DataTypes);
const Especialidades = require('./especialidades')(sequelize, DataTypes);
const Estados = require('./estados')(sequelize, DataTypes);
const Medico_Especialidad = require('./medico_especialidad')(sequelize, DataTypes);
const Notificadores = require('./notificadores')(sequelize, DataTypes);
const Sedes = require('./sedes')(sequelize, DataTypes);
const Tipos_Citas = require('./tipos_citas')(sequelize, DataTypes);

module.exports = {
    sequelize,
    Medico,
    Pacientes,
    Citas,
    Documentos,
    Especialidades,
    Estados,
    Medico_Especialidad,
    Notificadores,
    Sedes,
    Tipos_Citas
}