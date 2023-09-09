const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
    
    sequelize.define('cart_product', {
        amount: {
            type: DataTypes.INTEGER,
            allowNull: false
        }
    },
    {
        timestamps: false,
        tableName: 'cart_product'
    })
};