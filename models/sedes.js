module.exports = (sequelize, DataTypes) => {
    return sequelize.define('sedes', {
        sed_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        sed_nombre: {type: DataTypes.STRING(100)},
        sed_tipo_via: {type: DataTypes.STRING(50)},
        sed_numero_via: {type: DataTypes.STRING(10)},
        sed_numero_complemento: {type: DataTypes.STRING(10)},
        sed_barrio: {type: DataTypes.STRING(50)},
        sed_departamento: {type: DataTypes.STRING(50)},
        sed_codigo_postal: {type: DataTypes.STRING(20)},
        sed_detalles_direccion: {type: DataTypes.TEXT},
        ciu_id: {type: DataTypes.INTEGER, references: {model: 'ciudades', key: 'ciu_id'}},
        est_id: {type: DataTypes.INTEGER, references: {model: 'estados', key: 'est_id'}}
    }, {
        timestamps: false,
        freezeTableName: true
    });
};