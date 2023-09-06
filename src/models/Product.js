const { DataTypes } = require('sequelize');


module.exports = (sequelize) => {
  
  sequelize.define('product', {
    id:{
      type : DataTypes.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },
    averageRating: {
      type: DataTypes.FLOAT,
      allowNull: true,
      defaultValue: 0.0,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    dose:{
      type: DataTypes.STRING,
      allowNull: false,
    },
    amount:{
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    imageUrl: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    stock:{
      type: DataTypes.INTEGER,
      allowNull: false,      
    },
    price:{
        type: DataTypes.FLOAT,
        allowNull: false
    },
    needPrescription:{
        type: DataTypes.BOOLEAN
    },
    deleted: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false
    }
  },
   {
        timestamps: false,
        tableName: 'Product'
    });
};

