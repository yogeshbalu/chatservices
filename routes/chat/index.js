var express = require('express');
var router = express.Router();

router.get('/',require('./get'))
router.post('/',require('./post'))


module.exports = router;