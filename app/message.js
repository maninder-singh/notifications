const moment = require("moment");
const db = require("./mysql");
const logger = require("../config/logConfig");
const mailer = require("./mailer");

const messages = {};
const constant = {
    DATE_FORMATTER:"YYYYMMDD"
};

const queries = {
    MSG_FILTER_BY_DATE:"Select * from messages where isSend = 0 and date = ",
    MSG_UPDATE_IS_SEND:"update messages set isSend = 1 where id = ",
    MSG_INSERT:"insert into messages (data,date,recipient_email,isSend) values "
};

function updateNotificationStatus(data) {
    return function updateDB() {
      db.query(queries.MSG_UPDATE_IS_SEND + data.id,function (err, results, fields) {
            if(err){
                logger.error({errorStack:err,data:data},"Error occur while updating notification");
                return;
            }
            logger.info({data:data},"Notification updated successfully");
      });
    };
}

messages.getMessages = (date) => {
    if(!date || date.constructor !== Date){
        logger.info(`Date parameter should be of type Date constructor`);
        Promise.reject("Date parameter should be of type Date constructor");
        return;
    }

    return new Promise((resolve,reject) => {
        db.query(queries.MSG_FILTER_BY_DATE + moment(date).format(constant.DATE_FORMATTER),function (err, results, fields) {
            if(err){
                logger.error({errorStack:err,date:date},"Error occur while fetching notification");
                reject(err);
                return;
            }
            resolve(results);
        });
    });
};

messages.createNotification = (data) => {
    var query = `${queries.MSG_INSERT} ( "${data.message}","${data.date}","${data.email}",0)`;
    return new Promise((resolve,reject) => {
        db.query(query,function (err,result,fields) {
            if(err){
                logger.error({data:data},"Error occur while inserting notification");
                reject();
                return;
            }
            logger.info({data:data},"Notification inserted successfully");
            resolve();
        });
    });
};

messages.sendNotification = (data) => {
    if(data.length === 0){
        logger.info(`No notifications to send on ${moment().format("YYYY-MM-DD")}`);
        return;
    }
    data.forEach(function (row) {
        mailer.send({
            subject:"Notifications Message",
            to:row.recipient_email,
            text:row.data
        },updateNotificationStatus(row));
    });
};

module.exports = messages;