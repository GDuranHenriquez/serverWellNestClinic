const { DataTypes } = require('sequelize/types');

module.exports = (sequelize) => {
  
  sequelize.define('presentation_type', {
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
     updateAt: false
 })}