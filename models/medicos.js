module.exports = (sequelize, DataTypes) => {
    return sequelize.define('medicos', {
        med_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        med_primer_nombre: {type: DataTypes.STRING(50)},
        med_segundo_nombre: {type: DataTypes.STRING(50)},
        med_primer_apellido: {type: DataTypes.STRING(50)},
        med_segundo_apellido: {type: DataTypes.STRING(50)},
        med_telefono: {type: DataTypes.STRING(20)},
        med_correo: {type: DataTypes.STRING(100)},
        med_licencia: {type: DataTypes.STRING(50)},
        doc_id: {type: DataTypes.INTEGER, references: {model:'documentos', key: 'doc_id'}},
        est_id: {type: DataTypes.INTEGER, references: {model: 'documentos', key: 'doc_id'}}
    }, {
        timestamps: false,
        freezeTableName: true
    });
};