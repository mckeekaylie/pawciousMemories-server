module.exports = (sequelize, DataTypes) => {
    const Memory = sequelize.define('memory', {
        memory: {
            type: DataTypes.STRING,
            allowNull: false
        },
        dog: {
            type: DataTypes.STRING,
            allowNull: false
        },
        owner: {
            type: DataTypes.INTEGER,
            allowNull: false
        }
    })
    return Memory;
}

