const { DataTypes } = require('sequelize/types');

module.exports = (sequelize) => {
  
  sequelize.define('product', {
    id:{
      type : DataTypes.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,      
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },    
    laboratory:{
      type: DataTypes.STRING,
      allowNull: false
    },
    dose:{
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    type:{
      type: DataTypes.STRING,  
      allowNull: false,
    },
    amount:{
        type: DataTypes.INTEGER,  
        allowNull: false,
      },
    image:{
      type: DataTypes.TEXT,
      allowNull: false
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
    }
  },
   {
        timestamps: false,
        createAt: false,
        updateAt: false
    });
};
