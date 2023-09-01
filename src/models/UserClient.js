const {DataTypes} = require("sequelize");

module.exports = (sequelize) => {

    sequelize.define("userClient", {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
            allowNull: false
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false    
        },
        lastName: {
            type: DataTypes.STRING,
            allowNull: false
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        password: {
            type: DataTypes.STRING,
            allowNull: true,
            validate:{
                len: [8,32]
            }
        },
        dni: {
            type: DataTypes.INTEGER,
            allowNull: false,
            unique: true
        },
        dniType: {
            type: DataTypes.STRING,
            allowNull: false
        },
        birthDate: {
            type: DataTypes.DATE,
            allowNull: false
        },
        address: {
            type: DataTypes.STRING,
            allowNull: false
        },
        deleted: {
            type: DataTypes.BOOLEAN,
            defaultValue: false
        },
        upToDate: {
            type: DataTypes.DATE,
            allowNull: false
        },
        backupContact: {
            type: DataTypes.STRING,
            allowNull: false
        },
        imageUrl: {
            type: DataTypes.TEXT,
            allowNull: true
        },
        activePlan:{
            type: DataTypes.BOOLEAN,
            defaultValue: true
        },
        emailRegister:{
            type: DataTypes.STRING,
            allowNull: true,
            unique: true
        }
    },
   {
        timestamps: false,
        createAt: false,
        updateAt: false,
        tableName: 'UserClient'
    });
};