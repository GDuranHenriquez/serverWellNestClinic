const { DataTypes, Op } = require("sequelize");

module.exports = (sequelize) => {
    sequelize.define("statusAppointment", {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false
        },
        status:{
            type: DataTypes.STRING,
            allowNull: false,
            unique:true,
            validate:{
                isIn: [['open', 'close', 'cancel']]
            }
        }
    },
    {
        timestamps: false,
        tableName: 'StatusAppointment'
    }
    );
};