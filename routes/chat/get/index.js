var express = require('express');
var router = express.Router();


router.get('/',function(req,res){
    res.json("This is get request");
})

module.exports = router;