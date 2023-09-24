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
        discount: {
            type: DataTypes.DECIMAL(10,2)
        },
        date: {
            type: DataTypes.DATE,
            allowNull: false
        },
        stripeId: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        }
    },
    {
        timestamps: false,
        tableName: 'Sale'
    }
    );
};