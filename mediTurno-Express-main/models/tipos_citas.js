module.exports = (sequelize, DataTypes) => {
    return sequelize.define('tipos_citas', {
        tip_cit_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        tip_cit_nombre: {type: DataTypes.STRING(100)}
    }, {
        timestamps: false,
        freezeTableName: true
    });
};