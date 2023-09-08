const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
    sequelize.define("score", {
        id: {
            type: DataTypes.UUID,
            allowNull: false,
            primaryKey: true,
            defaultValue: DataTypes.UUIDV4
        },
        text: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        stars: {
            type: DataTypes.INTEGER,
            allowNull: false,
            validate: {
                min: 1,
                max: 5
            }
        }
    },
    {
        timestamps: false,
        tableName: 'Score'
    });
};