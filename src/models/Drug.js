const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  
  sequelize.define('drug', {
    id:{
      type : DataTypes.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,      
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    }
},
{
     timestamps: false,
     createAt: false,
     updateAt: false,
     tableName: 'Drug'
 })}