module.exports = (sequelize, DataTypes) => {
    return sequelize.define('notificadores', {
        not_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        not_tipo: {type: DataTypes.STRING(50)},
        not_fecha_envio: {type: DataTypes.DATE},
        cit_id: {type: DataTypes.INTEGER, references: {model: 'citas', key: 'cit_id'}}
    }, {
        timestamps: false,
        freezeTableName: true
    });
};