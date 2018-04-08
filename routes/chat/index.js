var express = require('express');
var router = express.Router();

router.get('/',require('./getchat'))
router.post('/',require('./createchatrecord'))



module.exports = router;