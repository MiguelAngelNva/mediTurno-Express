module.exports = (sequelize, DataTypes) => {
    return sequelize.define('citas', {
        cit_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        cit_fecha: {type: DataTypes.DATE},
        cit_hora: {type: DataTypes.TIME},
        tip_cit_id: {type: DataTypes.INTEGER, references: {model:'tipos_citas', key: 'tip_cit_id'}},
        med_id: {type: DataTypes.INTEGER, references: {model: 'medicos', key: 'med_id'}},
        pac_id: {type: DataTypes.INTEGER, references: {model: 'pacientes', key: 'pac_id'}},
        sed_id: {type: DataTypes.INTEGER, references: {model: 'sedes', key: 'sed_id'}},
        est_id: {type: DataTypes.INTEGER, references: {model: 'estados', key: 'est_id'}}
    }, {
        timestamps: false,
        freezeTableName: true
    });
};