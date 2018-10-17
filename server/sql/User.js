const DataType = require('sequelize');
const sequelize = require('./db');
let User = sequelize.define('user', {
    uid: {
        type: DataType.INTEGER,
        primaryKey: true,
        autoIncrement: true,
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

module.exports = User;