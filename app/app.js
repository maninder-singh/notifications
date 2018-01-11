const schedule = require("./schedule");
const logger = require("../config/logConfig");
const message = require("./message");
const config = require("../config/config");
const cronParser = require("cron-parser");
const interval = cronParser.parseExpression(config.CRON_JOB_RULE);
const moment = require("moment");
const path = require("path");

if(moment(interval.next().toDate()).isSame(moment(),"day")){
    // cron job pick today's notifications when run
}else{
    // execute today's notification manually
    // because cron has pass before start of server
    logger.info("Manually trigger notification");
    message.getMessages(new Date())
        .then((data) => {
            message.sendNotification(data);
        },(error) => {});
}

// Schedule job
schedule.createJob("Notification cron job created",config.CRON_JOB_RULE,function () {
    message.getMessages(new Date())
        .then((data) => {
            message.sendNotification(data);
        },(error) => {});
});


// Express server
const express = require("express");
const app = express();

app.use(express.static(path.join(__dirname,"..","public","ui")));
app.use(express.json());

app.get("/",(req,res) => {
    res.redirect("/index.html");
});

app.post("/notifications",(req,res,next) => {
    var data = {
        "email":req.body.email,
        "message":req.body.message,
        "date":req.body.date
    };

    message.createNotification(data).then(function (response) {
        res.status(201);
        res.send(JSON.stringify({
            "message":"Notification created successfully"
        }));
        next();
    },function (error) {
        res.status(500);
        res.send(JSON.stringify({
            "message":"Error occur while creating notification"
        }));
        next();
    });
});

app.listen(config.UI_PORT);
logger.info("UI started successfully");