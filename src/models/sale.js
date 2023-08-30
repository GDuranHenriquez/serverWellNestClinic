const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
    sequelize.define("sale", {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false
        },
        price: {
            type: DataTypes.FLOAT,
            allowNull: false
        },
        date: {
            type: DataTypes.DATE,
            allowNull: false
        }
    },
    {
        timestamps: false,
        createAt: false,
        updateAt: false,
        tableName: 'Sale'
    }
    );
};