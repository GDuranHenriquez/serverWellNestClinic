const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  
  sequelize.define('presentationType', {
    id:{
      type : DataTypes.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },
    type: {
      type: DataTypes.STRING,
      allowNull: false,
    }
},
{
     timestamps: false,
     createAt: false,
     updateAt: false,
     tableName: 'PresentationType'
 })}