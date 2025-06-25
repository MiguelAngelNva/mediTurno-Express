module.exports = (sequelize, DataTypes) => {
    return sequelize.define('documentos', {
        doc_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        doc_tipo_documento: {type: DataTypes.STRING(50)},
        doc_numero_documento: {type: DataTypes.STRING(50)},
        doc_fecha_expedicion: {type: DataTypes.DATE},
        ciu_id: {type: DataTypes.INTEGER, references: {model: 'ciudades', key: 'ciu_id'}}
    }, {
        timestamps: false,
        freezeTableName: true
    });
};