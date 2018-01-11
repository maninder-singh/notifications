const schedule = require("node-schedule");
const logger = require("../config/logConfig");

const jobs = {};

function recurrenceRule(ruleObj) {
    let rule = new schedule.RecurrenceRule();
    if(ruleObj.hasOwnProperty("year")){
        rule.year = ruleObj.year;
    }
    if(ruleObj.hasOwnProperty("dayOfWeek")){
        rule.dayOfWeek = ruleObj.dayOfWeek;
    }
    if(ruleObj.hasOwnProperty("date")){
        rule.date = ruleObj.date;
    }
    if(ruleObj.hasOwnProperty("hour")){
        rule.hour = ruleObj.hour;
    }
    if(ruleObj.hasOwnProperty("year")){
        rule.year = ruleObj.year;
    }
    if(ruleObj.hasOwnProperty("minute")){
        rule.minute = ruleObj.minute;
    }
    if(ruleObj.hasOwnProperty("month")){
        rule.month = ruleObj.month;
    }
    if(ruleObj.hasOwnProperty("second")){
        rule.second = new schedule.Range(0,59,ruleObj.second);
    }
    return rule;
}

function getRuleObject(rule) {
    if(rule.constructor === Object){
        return recurrenceRule(rule);
    }
    return rule;
}

module.exports.createJob = function (name,rule, callback) {
    let r;
    if(!name){
        logger.error("job name should not be empty");
        throw new Error("job name should not be empty");
    }
    if(jobs.hasOwnProperty(name)){
        logger.error("job with same name already exists");
        throw new Error("job with same name already exists");
    }

    if(!rule){
        logger.error("rule should not be blank or empty");
        throw new Error("rule should not be blank or empty");
    }

    if(!callback){
        logger.error("callback should not be a empty");
    }

    jobs[name] = schedule.scheduleJob(getRuleObject(rule),callback);
    logger.info({jobName:name,rule:rule},"Notification cron job schedule successfully");
};

module.exports.deleteJob = function (name) {
  if(!name){
      logger.error(`no cron job found with name : ${name}`);
      return;
  }

  if(jobs.hasOwnProperty(name)){
      jobs[name].cancel();
  }
  logger.info(`cron job with name : ${name} deleted successfully`);
};