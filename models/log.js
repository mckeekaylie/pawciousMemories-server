module.exports = (sequelize, DataTypes) => {
    const Log = sequelize.define('log', {
        date: {
            type: DataTypes.DATEONLY,
            allowNull: false
        },
        title: {
            type: DataTypes.STRING,
            allowNull: false
        },
        bands: {
            type: DataTypes.ARRAY(DataTypes.STRING),
            allowNull: false
        },
        venue: {
            type: DataTypes.STRING,
            allowNull: false
        },
        owner: {
            type: DataTypes.INTEGER,
            allowNull: false
        }
    })
    return Log;
}

