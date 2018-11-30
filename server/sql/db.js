const Sequelize = require('sequelize');
const dbConfig = require('../config/db');
const fs = require('fs');
const path = require('path');
const {
    database,
    user,
    password,
    host
} = dbConfig;
var sequelize = new Sequelize(database, user, password, {
    host: host,
    dialect: 'mysql',
    pool: {
        max: 5,
        min: 0,
        idle: 30000
    }
});
importModels(sequelize,'models');

function importModels(sequelize,filePath) {
    filePath = path.resolve(__dirname,filePath);
    var files = fs.readdirSync(filePath);
    files.forEach(filename =>{
        let modelName = path.basename(filename, '.js');
        let absFileName = path.resolve(filePath,filename);
        let relFileName = path.relative(__dirname,absFileName);
        sequelize.import(relFileName);

    });
}
module.exports = sequelize;