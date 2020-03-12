module.exports = (sequelize, DataTypes) => {
    const Bucketlist = sequelize.define('bucketlist', {
        bands: {
            type: DataTypes.ARRAY(DataTypes.STRING),
            allowNull: false
        },
        owner: {
            type: DataTypes.INTEGER,
            allowNull: false
        }
    })
    return Bucketlist;
}

