const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  
  sequelize.define('detailsale', {
    id:{
      type : DataTypes.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,      
    },
    ammount: {
      type: DataTypes.INTEGER,
      allowNull: false,
    }
},
{
     timestamps: false,
     createAt: false,
     updateAt: false
 })}