const Sequelize = require('sequelize');
const dbConfig = require('../config/db');
const {database,user,password,host} =dbConfig;
console.log(database,user,password,host);
var sequelize = new Sequelize(database, user, password, {
    host: host,
    dialect: 'mysql',
    pool: {
        max: 5,
        min: 0,
        idle: 30000
    }
});
module.exports = sequelize;