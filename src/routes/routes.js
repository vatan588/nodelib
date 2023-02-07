var express = require('express')
var router = express.Router();

router.use('/v1/user/', require('./v1/user/user'))
module.exports = router;
