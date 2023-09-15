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
      type: DataTypes.STRING,
      allowNull: false,
      unique:true
    },
    discount: {
      type: DataTypes.FLOAT,
      allowNull: false
    }
    
},
{
     timestamps: false,
     tableName: 'Plan'
 })}