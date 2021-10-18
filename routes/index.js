const express = require('express');
const router = express.Router();

const home = require('./modules/home');
router.use('/', home);

const record = require('./modules/record');
router.use('/record', record); 

module.exports = router;