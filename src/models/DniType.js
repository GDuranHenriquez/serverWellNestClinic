const { DataTypes } = require('sequelize');


module.exports = (sequelize) => {
  
  sequelize.define('dniType', {
    id:{
      type : DataTypes.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,      
    },
    type: {
      type: DataTypes.STRING,
      allowNull: false,
      unique:true
    }
    
},
{
     timestamps: false,
     tableName: 'DniType'
 })}