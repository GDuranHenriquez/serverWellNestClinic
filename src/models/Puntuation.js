const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
    sequelize.define("puntuation", {
        id: {
            type: DataTypes.UUID,
            allowNull: false,
            primaryKey: true,
            defaultValue: DataTypes.UUIDV4
        },
        text: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        stars: {
            type: DataTypes.ENUM('1', '2', '3', '4', '5'),
            allowNull: false
        }
    },
    {
        timestamps: false,
        tableName: 'Puntuation'
    });
};