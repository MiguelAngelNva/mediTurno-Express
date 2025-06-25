const { Sequelize, DataTypes } = require('sequelize');

const sequelize = new Sequelize('mediturno', 'root', '12345', {
    host: "localhost",
    port: 3306,
    dialect: 'mysql'
});

const Medico = require('./medicos')(sequelize, DataTypes);
const Paciente = require('./pacientes')(sequelize, DataTypes);
const Cita = require('./citas')(sequelize, DataTypes);
const Documento = require('./documentos')(sequelize, DataTypes);
const Especialidad = require('./especialidades')(sequelize, DataTypes);
const Estado = require('./estados')(sequelize, DataTypes);
const MedicoEspecialidad = require('./medico_especialidad')(sequelize, DataTypes);
const Notificador = require('./notificadores')(sequelize, DataTypes);
const Sede = require('./sedes')(sequelize, DataTypes);
const TipoCita = require('./tipos_citas')(sequelize, DataTypes);
const Ciudad = require('./ciudades')(sequelize, DataTypes);

// Relaciones: Citas
Medico.hasMany(Cita, { foreignKey: 'med_id' });
Cita.belongsTo(Medico, { foreignKey: 'med_id' });

Paciente.hasMany(Cita, { foreignKey: 'pac_id' });
Cita.belongsTo(Paciente, { foreignKey: 'pac_id' });

TipoCita.hasMany(Cita, { foreignKey: 'tip_cit_id' });
Cita.belongsTo(TipoCita, { foreignKey: 'tip_cit_id' });

Estado.hasMany(Cita, { foreignKey: 'est_id' });
Cita.belongsTo(Estado, { foreignKey: 'est_id' });

Sede.hasMany(Cita, { foreignKey: 'sed_id' });
Cita.belongsTo(Sede, { foreignKey: 'sed_id' });

// Médico - Documento - Estado
Documento.hasMany(Medico, { foreignKey: 'doc_id' });
Medico.belongsTo(Documento, { foreignKey: 'doc_id' });

Estado.hasMany(Medico, { foreignKey: 'est_id' });
Medico.belongsTo(Estado, { foreignKey: 'est_id' });

// Paciente - Documento - Estado
Documento.hasMany(Paciente, { foreignKey: 'doc_id' });
Paciente.belongsTo(Documento, { foreignKey: 'doc_id' });

Estado.hasMany(Paciente, { foreignKey: 'est_id' });
Paciente.belongsTo(Estado, { foreignKey: 'est_id' });

// Documento - Ciudad
Ciudad.hasMany(Documento, { foreignKey: 'ciu_id' });
Documento.belongsTo(Ciudad, { foreignKey: 'ciu_id' });

// Sede - Ciudad - Estado
Ciudad.hasMany(Sede, { foreignKey: 'ciu_id' });
Sede.belongsTo(Ciudad, { foreignKey: 'ciu_id' });

Estado.hasMany(Sede, { foreignKey: 'est_id' });
Sede.belongsTo(Estado, { foreignKey: 'est_id' });

// Cita - Notificador
Cita.hasMany(Notificador, { foreignKey: 'cit_id' });
Notificador.belongsTo(Cita, { foreignKey: 'cit_id' });

// Sede - Ciudad
Ciudad.hasMany(Sede, { foreignKey: 'ciu_id' });
Sede.belongsTo(Ciudad, { foreignKey: 'ciu_id' });

// Relación muchos a muchos: Medico - Especialidad
Medico.belongsToMany(Especialidad, {
    through: MedicoEspecialidad,
    foreignKey: 'med_id'
});
Especialidad.belongsToMany(Medico, {
    through: MedicoEspecialidad,
    foreignKey: 'esp_id'
});

module.exports = {
    sequelize,
    Medico,
    Paciente,
    Cita,
    Documento,
    Especialidad,
    Estado,
    MedicoEspecialidad,
    Notificador,
    Sede,
    TipoCita,
    Ciudad
};
