const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
    sequelize.define("average", {
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
    },
    {
        timestamps: false,
        tableName: 'Average'
    })
};