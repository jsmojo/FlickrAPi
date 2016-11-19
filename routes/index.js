var express = require('express');
var router = express.Router();
//var appdata = require('../app_data/json/data.json');
var sesTransport = require('nodemailer-ses-transport');
var dudeObj = require("../app_data/json/phil.json");

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('index', {
        title: dudeObj.user.siteTitle
    });
});

router.get('/api/profile/dude', function(req, res, next) {
    res.json(dudeObj);
});

module.exports = router;