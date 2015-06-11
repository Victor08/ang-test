var _           = require('lodash');
var https       = require('https');
var http        = require('http');
var querystring = require('querystring');
var q           = require('q');

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

    get: function(url, urlPath, queryParams) {

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
    }
};
TwitterApi.prototype.config = {
    count: 5
};
module.exports = TwitterApi;