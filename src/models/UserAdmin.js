const {DataTypes} = require("sequelize");

module.exports = (sequelize) => {

    sequelize.define("userAdmin", {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
            allowNull: false
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        lastName: {
            type: DataTypes.STRING,
            allowNull: true
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false
        },
        deleted: {
            type: DataTypes.BOOLEAN,
            defaultValue: false
        },
        imageUrl: {
            type: DataTypes.TEXT,
            allowNull: true
        }
    },
   {
        timestamps: false,
        tableName: 'UserAdmin'
    });
};