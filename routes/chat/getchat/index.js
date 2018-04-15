var express = require('express');
var router = express.Router();
var getSqlConnection = require('../../../config/db');
var Promise = require("bluebird");



router.get('/',function(req,res){
    let username = req.query.username;
    let emailId = req.query.emailAddress;
    return Promise.resolve(true)
    .then(() => getChatId(username,emailId))
    .then(chatId => {
        //res.end(JSON.stringify(chatId));
        res.status(200).send(chatId);
    })
})

function getChatId(username,emailid){
 
    return   Promise.using(getSqlConnection(), function(connection){
        //return connection.query('select chat_id from chat.chat where username ="'+username+'" and email_id="'+emailid+'"')
        return connection.query('select chat_id from chat.chat where  email_id="'+emailid+'"')
        .then(rows => {
            console.log(rows);
             return rows;
        }).catch(err =>{
            return err;
        });

   });
}



module.exports = router;