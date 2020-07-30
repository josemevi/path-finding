const express = require('express');
let router = express.Router();

// router.use('/data',require('./route'));
// module.exports = router;

router.get('/prueba', require('./getPrueba'));



module.exports = router;