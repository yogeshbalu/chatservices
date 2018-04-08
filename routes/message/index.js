var express = require('express');
var router = express.Router();
var getSqlConnection = require('../../config/db');
var Promise = require("bluebird");


router.post('/',function(req,res){
    //res.json("This is post request");
    let requestData = req.body;
	var params  = {
        chat_id : requestData.chatId,
        sender_name: requestData.sender,
        message:requestData.message,
		created_date: new Date()
	}
    console.log(params);
    return insertIntoChatMessage(params)
    .then(result => {
        console.log(result);
        res.end(JSON.stringify(result));
    }).catch(err => {
        res.end(JSON.stringify(err))
    })
})

function insertIntoChatMessage(params){
    return   Promise.using(getSqlConnection(), function(connection){
        return connection.query('INSERT INTO chat.chat_message SET ? ', params)
        
        .then(result => {
            console.log(result.insertId);
             return result.insertId;
        }).catch(err =>{
            return err;
        });

   });
}


module.exports = router;