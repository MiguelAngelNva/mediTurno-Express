module.exports = (sequelize, DataTypes) => {
    return sequelize.define('especialidades', {
        esp_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        esp_nombre: {type: DataTypes.STRING(50)}
    }, {
        timestamps: false,
        freezeTableName: true
    });
};