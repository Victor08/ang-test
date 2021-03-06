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

router.get('/statuses/user_timeline.json', function(req, res, next){
    console.log('user timeline');
    var api = new twitterApi(userId, screenName, oauthAccessToken, oauthAccessTokenSecret, oauthConsumerKey, oauthConsumerSecret, count);

    var workingPath = req.originalUrl.replace(req.baseUrl, '');
    var queryString = req.originalUrl.substring(req.originalUrl.indexOf('?'));
    var queryParams = req.query;

    var fullUrl = 'https://api.twitter.com/1.1' + req.path;

    var response = api.requestByUser(fullUrl, queryParams);

    response.then(function(data){
        res.send(data);
    });

});

router.get('/search/tweets.json', function(req, res, next) {
    var api = new twitterApi(userId, screenName, oauthAccessToken, oauthAccessTokenSecret, oauthConsumerKey, oauthConsumerSecret, count);
    var fullUrl = req.originalUrl.replace(req.baseUrl, '');
    var response = api.get(fullUrl, req.path, req.query);
    response.then(function(data){
        res.send(data);
    });
});

module.exports = router;