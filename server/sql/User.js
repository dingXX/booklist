const DataType = require('sequelize');
const sequelize = require('./db');
var User = sequelize.define('pet', {
    id: {
        type: DataType.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    unionId: {
        type: DataType.STRING(100),
    },
    openId: {
        type: DataType.STRING(100),
        allowNull:false,

    },
    gender: {
        type: DataType.STRING(1),
    },
    nickName: {
        type: DataType.STRING(50),
    },
    avatarUrl: {
        type: DataType.STRING(255),
    },
    create_time: {
        type: DataType.INTEGER,
    },
    update_time: {
        type: DataType.INTEGER,
    },
}, {
    timestamps: false,
    freezeTableName: true,
});