const mysql = require("mysql");
const config = require("../config/config");
const logger = require("../config/logConfig");

logger.info({mysqlConfig:config.MYSQL},"Mysql configuration ");
const connection = mysql.createConnection({
    host:config.MYSQL.HOST,
    user:config.MYSQL.USER,
    password:config.MYSQL.PASSWORD,
    database:config.MYSQL.DATABASE
});

module.exports = connection;


