const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  
  sequelize.define('detailSale', {
    id:{
      type : DataTypes.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,      
    },
    amount: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    price: {
      type: DataTypes.FLOAT,
      allowNull: false
  }
},
{
     timestamps: false,
     tableName: 'DetailSale'
 })}