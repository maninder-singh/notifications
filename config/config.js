const config = {};
const constant = {
    env: {
        PROD:"prod",
        QA:"qa",
        DEV:"dev"
    }
};

config.ENV = constant.env;
const env = process.env.ENV && process.env.ENV.toLowerCase() || constant.env.DEV;

// Common config across environment
config.CRON_JOB_RULE = "0 11 * * *"; // daily at 11 am

// Logging
config.LOG = {
    FILENAME:"notification.log",
    LOCATION:"/paytm/logs/notifications",
    PERIOD:"1d", // daily rotation
    COUNT:7 // keep 7 back copies
};

// UI
config.UI_PORT = process.env.PORT || 3000;


if(env === constant.env.PROD){
    // prod environment
    config.MYSQL = {
        HOST:"localhost",
        USER:"root",
        PASSWORD:"root",
        DATABASE:"notifications"
    };

    config.MAIL = {
        IS_ENABLE:true,
        SERVICE: "",
        USERNAME:"",
        PASSWORD:""
    }
}else if(env === constant.env.QA){
    // qa environment
    config.MYSQL = {
        HOST:"localhost",
        USER:"root",
        PASSWORD:"root",
        DATABASE:"notifications"
    };

    config.MAIL = {
        IS_ENABLE:true,
        SERVICE: "",
        USERNAME:"",
        PASSWORD:""
    }
}else {
    // default dev environment
    config.MYSQL = {
        HOST:"localhost",
        USER:"root",
        PASSWORD:"root",
        DATABASE:"notifications"
    };

    config.MAIL = {
        IS_ENABLE:true,
        SERVICE: "", // Gmail
        USERNAME:"", // email id
        PASSWORD:"" // password
    }
}


module.exports = config;