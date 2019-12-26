const express = require('express');
let router = express.Router();

router.use('/', require('../controllers/items/items.router'));

module.exports = router;
