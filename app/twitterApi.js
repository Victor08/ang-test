var _           = require('lodash');
var https       = require('https');
var http        = require('http');
var querystring = require('querystring');
var q           = require('q');
var oauth       = require('');
var moment      = require('moment');

var TwitterApi = function(userId, screenName, oauthAccessToken, oauthAccessTokenSecret, consumerKey, consumerSecret, count){
    console.log('building twitter api');
    _.merge(this.config, {
        userId: userId,
        screenName: screenName,
        count: count,
        oauthAccessToken: oauthAccessToken,
        oauthAccessTokenSecret: oauthAccessTokenSecret,
        consumerKey: consumerKey,
        consumerSecret: consumerSecret
    });
};

TwitterApi.prototype = {

    generateNonce: function(){
        var text = "";
        var possible = "abcdefghijklmnopqrstuvwxyz0123456789";

        for( var i=0; i < 32; i++ )
            text += possible.charAt(Math.floor(Math.random() * possible.length));

        return text;
    },

    getBearerToken: function(){
        var deferred = q.defer();

        var bearerTokenCredentials = new Buffer (this.config.consumerKey + ':' + this.config.consumerSecret).toString('base64');

        var queryData = {
            grant_type: 'client_credentials'
        };

        var query = querystring.stringify(queryData);

        var request = https.request({
            host: 'api.twitter.com',
            path: '/oauth2/token?' + query,
            method: 'POST',
            headers: {
                'User-Agent': 'ang-test v0.0.1',
                'Authorization': 'Basic ' + bearerTokenCredentials + 'Content-Type: application/x-www-form-urlencoded;charset=UTF-8'
            }
        }, function(res){
            res.setEncoding('utf8');
            res.on('data',function(data){
                var response = {};
                try {
                    response = JSON.parse(data);
                    if (response.access_token) {
                        deferred.resolve(response.access_token);
                    } else {
                        deferred.reject(new Error('bearer token can not be found in server response'));
                    }
                } catch (e) {
                    console.error('cant parse server response');
                    deferred.reject(new Error('unable to parse server response'));
                }
            })
        }).on('error', function(e){
            console.error(e.message);
            deferred.reject(new Error('Error: ' + e.message));
        });

        request.write('');
        request.end();

        return deferred.promise;
    },

    getRequestToken: function(){
        var deferred = q.defer();

        var consumer = oauth.createConsumer(this.config.consumerKey, this.config.consumerSecret);
        var oauthSignature = oauth.createHmac(consumer);



        var request = {

            //port: 443,
            //https: true,
            host: 'api.twitter.com',
            method: 'POST',
            path: '/oauth/request_token',
            headers: {
                'User-Agent': 'ang-test v0.0.1',
                Authorization: 'OAuth oauth_callback="' + encodeURIComponent('http://localhost:3000/#/userTweets') + '",' +
                'oauth_consumer_key="' + encodeURIComponent(this.config.consumerKey) + '",' +
                'oauth_nonce="' + this.generateNonce() + '",' +
                'oauth_signature="' + encodeURIComponent(oauthSignature) + '",' +
                'oauth_signature_method="HMAC-SHA1",' +
                'oauth_timestamp="' + (moment.utc() / 1000) + '",' +
                'oauth_version="1.0"'
            }
        };

        request = https.request(request, function(res){
            res.setEncoding('utf8');
            res.on('data',function(data){
                var response = {};
                try {
                    response = JSON.parse(data);
                    if (response.access_token) {
                        deferred.resolve(response.access_token);
                    } else {
                        deferred.reject(new Error('bearer token can not be found in server response'));
                    }
                } catch (e) {
                    console.error('cant parse server response');
                    deferred.reject(new Error('unable to parse server response'));
                }
            })
        }).on('error', function(e){
            console.error(e.message);
            deferred.reject(new Error('Error: ' + e.message));
        });
        request.write('');
        request.end();

        return deferred.promise;
    },

    get: function(url) {

        var deferred = q.defer();

        if (_.isUndefined(url)) {
            console.error('url is not defined');
            return;
        }

        var bearerToken = this.getBearerToken();

        var query = '&user_id=' + this.config.userId + '&count=' + this.config.count;

        bearerToken.then(function(token){
            var message = "";
            https.get({
                    host: 'api.twitter.com',
                    path: '/1.1' + url + query,
                    method: 'GET',
                    headers: {
                        'User-Agent': 'ang-test v0.0.1',
                        'Authorization': 'Bearer ' + token
                    }
                },
                function(res){
                    res.setEncoding('utf8');
                    res.on('data', function(chunk){
                        message += chunk;
                    });
                    res.on('end', function(){
                        var tweets = JSON.parse(message);
                        deferred.resolve(tweets);
                    })
                }).on('error', function(e) {
                    console.error(e.message);
                    deferred.reject(new Error('Error: ' + e.message));
                });
        });

        return deferred.promise;
    },

    requestByUser: function(url){
        var deferred = q.defer();

        var requestToken = this.getRequestToken();

        requestToken.then(function(token){
            console.log('my token', token);
            deferred.resolve(token);
        });


        return deferred.promise;
    }
};
TwitterApi.prototype.config = {
    count: 5
};
module.exports = TwitterApi;