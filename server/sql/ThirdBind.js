const DataType = require('sequelize');
const sequelize = require('./db');
let ThirdBind = sequelize.define('user', {
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
    createAt: {
        type: DataType.INTEGER,
    },
    updateAt: {
        type: DataType.INTEGER,
    },
}, {
    timestamps: false,
    freezeTableName: true,
});

module.exports = ThirdBind;