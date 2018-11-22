const DataType = require('sequelize');
const sequelize = require('./db');
let ThirdBind = sequelize.define('THIRD_BIND', {
    id: {
        type: DataType.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    uid:{
        type:DataType.INTEGER,
        allowNull:false
    },
    unionId:{
        type:DataType.STRING(100),

    },
    openId:{
        type:DataType.STRING(100),
        allowNull:false,
    },
    type:{
        type:DataType.STRING(50),
        allowNull:false,
    },
    nickName: {
        type: DataType.STRING(50),
    },
    avatarUrl: {
        type: DataType.STRING(255),
    },
    createdAt: {
        type: DataType.INTEGER,
    },
    updatedAt: {
        type: DataType.INTEGER,
    },
}, {
    timestamps: true,
    freezeTableName: true,
});

module.exports = ThirdBind;