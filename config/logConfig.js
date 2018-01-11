const bunyan = require("bunyan");
const config = require("./config");
const path = require("path");
const fs = require("fs");
const logConfig = {};


const env = process.env.ENV && process.env.ENV.toLowerCase() || config.ENV.DEV;

// app name
logConfig.name = "notification";
logConfig.level = "info";

if(env === config.ENV.PROD){
    // prod environment

   createLogDirectory(config.LOG.LOCATION);
   logConfig.streams = [{
        type: 'rotating-file',
        path: path.join(config.LOG.LOCATION,config.LOG.FILENAME),
        period: config.LOG.PERIOD,   // daily rotation
        count: config.LOG.COUNT      // keep 3 back copies
    }];
}else if(env === config.ENV.QA){
    // qa environment

    createLogDirectory(config.LOG.LOCATION);
    logConfig.streams = [{
        type: 'rotating-file',
        path: path.join(config.LOG.LOCATION,config.LOG.FILENAME),
        period: config.LOG.PERIOD,   // daily rotation
        count: config.LOG.COUNT      // keep 3 back copies
    }];
}else {
    // default dev environment
    logConfig.stream = process.stdout;
}


function createLogDirectory(path) {
    if(!fs.existsSync(path)){
        fs.mkdirSync(path);
    }
}

module.exports = bunyan.createLogger(logConfig);