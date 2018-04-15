var express = require('express');
var router = express.Router();
var nodemailer = require("nodemailer");
var getSqlConnection = require('../../config/db');
var Promise = require("bluebird");

var smtpTransport = nodemailer.createTransport({
    service: "gmail",
    host: "smtp.gmail.com",
    auth: {
        user: "deek.khadsare@gmail.com",
        pass: "Welcome@1"
    }
});


router.post('/', function (req, res) {
    var requestData = req.body;
    var mailOptions = {
        to: "",
        subject: "Chat conversation history" + new Date(),
        text: ""
    }

    return Promise.resolve()
    .then(() => getEmailID(requestData.chatId))
    .then((emailId) => {
        mailOptions.to = emailId[0].email_id;
        return getChatMessages(requestData.chatId);
    })
    .then(chatHistory => {
        //mailOptions.text = chatHistory;
        if(chatHistory.length > 0){
            for(var i =0 ; i < chatHistory.length; i++) {
                mailOptions.text =  mailOptions.text + chatHistory[i].message + "\n";
            }
        }
        smtpTransport.sendMail(mailOptions, function (error, response) {
            if (error) {
                console.log(JSON.stringify(error));
                res.end(JSON.stringify("error"));
            } else {
                console.log("Message sent: " + response.message);
                res.end(JSON.stringify("sent"));
            }
        });
    })
})

function getChatMessages(chatId){

    let params = {
        chat_id : chatId
    }

    return   Promise.using(getSqlConnection(), function(connection){
        return connection.query('select message from chat.chat_message where chat_id ="'+chatId+'"')
        .then(rows => {
            console.log(rows);
             return rows;
        }).catch(err =>{
            return err;
        });

   });
}
function getEmailID(chatId){

    let params = {
        chat_id : chatId
    }

    return   Promise.using(getSqlConnection(), function(connection){
        return connection.query('select email_id from chat.chat where chat_id ="'+chatId+'"')
        .then(rows => {
            console.log(rows);
             return rows;
        }).catch(err =>{
            return err;
        });

   });
}



module.exports = router;