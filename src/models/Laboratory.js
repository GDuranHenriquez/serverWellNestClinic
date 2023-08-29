const { DataTypes } = require('sequelize/types');

module.exports = (sequelize) => {
  
  sequelize.define('laboratory', {
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
     updateAt: false
 })}