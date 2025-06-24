module.exports = (sequelize, DataTypes) => {
    return sequelize.define('medico_especialidad', {
        med_esp_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        med_id: {type: DataTypes.INTEGER, references: {model: 'medicos', key: 'med_id'}},
        esp_id: {type: DataTypes.INTEGER, references: {model: 'especialidades', key: 'esp_id'}}
    }, {
        timestamps: false,
        freezeTableName: true
    });
};