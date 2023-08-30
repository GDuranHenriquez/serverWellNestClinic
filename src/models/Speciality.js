const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
    sequelize.define("speciality", {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false
        }
    },
    {
        timestamps: false,
        createAt: false,
        updateAt: false,
        tableName: 'Speciality'
    }
    );
};