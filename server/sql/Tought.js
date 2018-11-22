const DataType = require('sequelize');
const sequelize = require('./db');
let User = sequelize.define('tought', {
    id: {
        type: DataType.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    openId: {
        type: DataType.STRING(100),
        allowNull:false,
    },
    type: {
        type: DataType.STRING(20),
        allowNull:false,
    },
    name: {
        type: DataType.STRING(100),
        allowNull:false,
    },
    content: {
        type: DataType.TEXT,
    },
    image:{
        type: DataType.TEXT,
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

module.exports = User;