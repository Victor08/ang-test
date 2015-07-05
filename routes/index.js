var express = require('express');
var router = express.Router();
var root = './views';

/* GET home page. */
router.get('*', function(req, res, next) {
    res.render('layout', { root: root });
});

module.exports = router;
