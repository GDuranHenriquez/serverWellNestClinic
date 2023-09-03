const { DataTypes } = require('sequelize');


module.exports = (sequelize) => {
  
  sequelize.define('plan', {
    id:{
      type : DataTypes.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,      
    },
    // name: {
    //   type: DataTypes.STRING,
    //   allowNull: false,
    //   validate: {
    //     isIn: [['gold','bronze','silver']]
    //   }
      name: {
        type: DataTypes.ENUM('gold','bronze','silver'),
        allowNull: false,
        unique:true
    }
    
},
{
     timestamps: false,
     tableName: 'Plan'
 })}