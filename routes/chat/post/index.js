var express = require('express');
var router = express.Router();
var dbconnection = require('../../../config/db');


router.post('/',function(req,res){
    res.json("This is post request");
})

module.exports = router;