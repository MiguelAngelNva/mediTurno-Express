module.exports = (sequelize, DataTypes) => {
    return sequelize.define('pacientes', {
        pac_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        pac_primer_nombre: {type: DataTypes.STRING(50)},
        pac_segundo_nombre: {type: DataTypes.STRING(50)},
        pac_primer_apellido: {type: DataTypes.STRING(50)},
        pac_segundo_apellido: {type: DataTypes.STRING(50)},
        pac_telefono: {type: DataTypes.STRING(30)},
        pac_correo: {type: DataTypes.STRING(100)},
        doc_id: {type: DataTypes.INTEGER, references: {model: 'documentos', key: 'doc_id'}},
        est_id: {type: DataTypes.INTEGER, references: {model: 'estados', key: 'est_id'}}
    }, {
        timestamps: false,
        freezeTableName: true
    });
};