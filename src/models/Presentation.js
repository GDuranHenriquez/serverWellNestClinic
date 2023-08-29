const { DataTypes } = require('sequelize/types');

module.exports = (sequelize) => {
  
  sequelize.define('presentation', {
    id:{
      type : DataTypes.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,      
    },
    dose: {
      type: DataTypes.STRING,
      allowNull: false,
    }
},
{
     timestamps: false,
     createAt: false,
     updateAt: false
 })}