const config = require("../config/config");
const logger = require("../config/logConfig");
const nodemailer = require("nodemailer");

let transporter = nodemailer.createTransport({
    service:config.MAIL.SERVICE,
    auth:{
        user:config.MAIL.USERNAME,
        pass:config.MAIL.PASSWORD
    }
});

module.exports.send = (mail,callback) => {
    if(!config.MAIL.IS_ENABLE){
        logger.info("Email notification is not enabled");
        return;
    }

    let mailObject = {
        from:`Notification Messages <${config.MAIL.USERNAME}>`
    };

    if(!mail.to){
        logger.error({mail:mail},"Recipient ( To ) must be present");
        throw new Error("Recipient ( To ) must be present");
        return;
    }

    mailObject.to = mail.to;

    if(!mail.subject){
        logger.error({mail:mail},"Subject must be present");
        throw new Error("Subject must be present");
        return;
    }

    mailObject.subject = mail.subject;

    if(mail.text){
       mailObject.text = mail.text;
    }

    if(mail.html){
        mailObject.html = mail.html;
    }

    transporter.sendMail(mailObject,(err,response) => {
        // transporter.close();
        if(err){
            logger.error({errorStack:err},"Error occur while sending email");
            return;
        }
        logger.info({response:response,mail:mailObject},"Email send successfully");
        if(callback){
            callback.call();
        }
    });
};