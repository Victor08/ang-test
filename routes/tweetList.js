var express = require('express');
var router = express.Router();
var root = './views';

/* GET home page. */
router.get('/', function(req, res, next) {
    res.sendFile('list/main.html', { root: root });
});

module.exports = router;
