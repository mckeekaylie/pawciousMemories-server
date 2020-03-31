module.exports = (sequelize, DataTypes) => {
    const Gallery = sequelize.define('gallery', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name: DataTypes.STRING,
        description: DataTypes.STRING,
        poster: DataTypes.STRING,
        owner: {
            type: DataTypes.INTEGER,
            allowNull: false
        }
    })
    return Gallery;
}