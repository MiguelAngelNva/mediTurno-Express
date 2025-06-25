module.exports = (sequelize, DataTypes) => {
    return sequelize.define('estados', {
        est_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        est_entidad: {type: DataTypes.STRING(50)},
        est_nombre: {type: DataTypes.STRING(50)}
    }, {
        timestamps: false,
        freezeTableName: true
    });
};