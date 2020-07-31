const express = require('express');
let router = express.Router();

router.get('/createUser', require('./createUser'));



module.exports = router;