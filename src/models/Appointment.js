const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
    sequelize.define("appointment", {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false
        },
        date: {
            type: DataTypes.DATEONLY,
            allowNull: false
        },
        startTime: {
            type: DataTypes.TIME,
            allowNull: false
        },
        endTime: {
            type: DataTypes.TIME,
            allowNull: false
        }
    },
    {
        timestamps: false,
        tableName: 'Appointment'
    }
    );
};