const express = require('express');
let router = express.Router();

router.get('/getRoutes', require('./getRoutes'));
router.post('/addUser', require('./AddUser'));
router.post('/addRoute', require('./addRoute'));

module.exports = router;