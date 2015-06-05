var _           = require('lodash');
var crypto      = require('crypto');
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

    test: function(){
        console.log('my reques url', this.requestUrl);
    },

    buildBaseString: function(baseUrl, method, params){
        console.log('building base string');
        var result = [];

        _.each(params, function (val, key){
            result.push(key + '=' + encodeURIComponent(val));
        });
        console.log('result', result);
        return method + '&' + encodeURIComponent(baseUrl) + '&' + encodeURIComponent(result.join('&'));
    },

    buildOauthHeader: function(oauth){
        var result = 'Authorization: OAuth ';
        var values = [];
        _.each(oauth, function(val, key){
            values.append(key + '="' + encodeURIComponent(val) + '"');
        });
        result = result.concat(values.join(', '));
        return result;
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
                'Authorization': 'Basic ' + bearerTokenCredentials + 'Content-Type: application/x-www-form-urlencoded;charset=UTF-8',
                //'Content-length': query.length
            }
        }, function(res){
            res.setEncoding('utf8');
            res.on('data',function(data){
                console.log('now i have data', data);
                var response = {};
                try {
                    response = JSON.parse(data);
                    if (response.access_token) {
                        deferred.resolve(response.access_token);
                    } else {
                        return false;
                    }
                } catch (e) {
                    console.error('cant parse server response');
                }
            })
        }).on('error', function(e){
            console.error(e.message);
        });

        request.write('');
        request.end();
    },

    get: function(url, urlPath, queryParams) {

        var that = this;

        if (_.isUndefined(url)) {
            console.error('url is not defined');
            return;
        }

        var baseUrl = this.config.baseUrl + urlPath;
        var fullUrl = this.config.baseUrl + url;

        var now = new Date().getTime();

        var bearerToken = this.getBearerToken();



        //var oauth = {
        //    oauth_consumer_key: that.config.consumerKey,
        //    oauth_nonce: now,
        //    oauth_signature_method: 'HMAC-SHA1',
        //    oauth_token: that.config.oauthAccessToken,
        //    oauth_timestamp: now,
        //    oauth_version: '1.0'
        //};
        //
        //var baseInfo = this.buildBaseString(baseUrl, 'GET', _.merge(oauth, queryParams));
        //var compositeKey = encodeURIComponent(this.config.consumerSecret) + '&' + encodeURIComponent(this.config.oauthAccessTokenSecret);
        //oauth['oauth_signature'] = crypto.createHmac('sha1', compositeKey).update(baseInfo).digest('base64');

        var query = '?user_id' + this.config.userId + '&count=' + this.config.count;

        https.get({
            host: 'api.twitter.com',
            path: '/1.1' + urlPath + '?' + query,
            method: 'GET',
                headers: {
                    'User-Agent': 'ang-test v0.0.1',
                    'Authorization': 'Bearer ' + bearerToken
                }
        },
            function(res){
                res.setEncoding('utf8');
                res.on('data', function(data){
                    var present = data.toString();
                    console.log('now i have data', data.toString());
                });
            return true;
        }).on('error', function(e) {
            console.error(e.message);
        });

        return false;
    }

};
TwitterApi.prototype.config = {
    baseUrl: 'https://api.twitter.com/1.1',
    count: 5
};
module.exports = TwitterApi;