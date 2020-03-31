module.exports = (sequelize, DataTypes) => {
    const Info = sequelize.define('info', {
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        species: {
            type: DataTypes.STRING,
        },
        breed: {
            type: DataTypes.STRING,
        },
        dob: {
            type: DataTypes.STRING,
        },
        dateOfAdoption: {
            type: DataTypes.STRING,
        },
        adoptOrFoster: {
            type: DataTypes.STRING
        }
    })
    return Info;
}