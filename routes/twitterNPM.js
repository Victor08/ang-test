var express = require('express');
var router = express.Router();
var twitterApi = require('app/twitterApi');
var Twitter = require('twitter');
var Url = require('url');


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

router.get('*', function(req, res, next){
    var url = decodeURIComponent(req.originalUrl.replace(req.baseUrl, ''));
    var urlParsed = Url.parse(url, true);

    if (url.match(/^\/statuses\/user_timeline/)) {
        client.get(urlParsed.pathname, urlParsed.query, function(error, tweets, response){

            if(! error) {
                res.send({statuses: tweets});
            }
        });
        return;
    }

    if (url.match(/^\/statuses\/update/)) {
        client.post(urlParsed.pathname, urlParsed.query, function(error, tweets, response) {
            if (response.statusMessage === 'OK') {
                res.send({status: 'OK', tweet: tweets});
            }
            if(error){
                res.send({status: 'ERR', message: error})
            }
        });
        return;
    }

    if (url.match(/^\/statuses\/destroy/)) {
        client.post(urlParsed.pathname, function(error, tweets, response) {
            if (response.statusMessage === 'OK') {
                res.send({status: 'OK'})
            }
            if(error) {
                res.send({status: 'ERR', message: error})
            }
        })
    }
});

module.exports = router;