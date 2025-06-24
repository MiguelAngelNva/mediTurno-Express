module.exports = (sequelize, DataTypes) => {
    return sequelize.define('ciudades', {
        ciu_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        ciu_nombre: {type: DataTypes.STRING(100)}
    }, {
        timestamps: false,
        freezeTableName: true
    });
};