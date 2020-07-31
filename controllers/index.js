const express = require('express');
const router = express.Router();

router.get('/getRoutes', require('./getRoutes'));
router.get('/getOptimalRoute', require('./getOptimalRoute'));
router.post('/addUser', require('./AddUser'));
router.post('/addRoute', require('./addRoute'));

module.exports = router;