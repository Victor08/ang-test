var express = require('express');
var router = express.Router();
var twitterApi = require('app/twitterApi');
var Twitter = require('twitter');


var oauthConsumerKey = 'RlTUNEyXQDMxaOdOHAUawMKbP',
    oauthConsumerSecret = 'VzHrDKflFYTQ8mgKn1wArE4pHFyWoQxi8PbdYN7w6vdCDwKDjb',
    oauthAccessToken = '3241763915-5cyVKbNOR7shvLT5KqPpDR4xtrDbs0kAJrPadWM',
    oauthAccessTokenSecret = 'MQn7ulfLQsS1qjNj8jsIf19mh6Wi9osPmSI4a9bGSo03W',
    userId = 3241763915,
    screenName = 'imtiredofthinki',
    count = 10;

var client = new Twitter({
    consumer_key: oauthConsumerKey,
    consumer_secret: oauthConsumerSecret,
    access_token_key: oauthAccessToken,
    access_token_secret: oauthAccessTokenSecret
});

router.get('/', function(req, res, next){
    client.get(req.path, function(error, tweets, response){
        if(error) throw error;
        console.log(tweets);  // Tweet body.
        console.log(response);  // Raw response object.
    })
});