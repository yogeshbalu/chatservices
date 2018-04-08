var express = require('express');
var router = express.Router();
var getSqlConnection = require('../../../config/db');
var Promise = require("bluebird");


router.post('/',function(req,res){
    //res.json("This is post request");
	var params  = {
        username : req.body.username,
        email_id:req.body.email,
		created_date: new Date()
	}
   console.log(params);
   return insertIntoChat(params)
   .then(result => {
      res.end(JSON.stringify(result));
   }).done(); 
})

function insertIntoChat(params){
    return   Promise.using(getSqlConnection(), function(connection){
        return connection.query('INSERT INTO chat.chat SET ? ', params)
        .then(result => {
            console.log(result.insertId);
             return result.insertId;
        }).catch(err =>{
            return err;
        });

   });
}

module.exports = router;