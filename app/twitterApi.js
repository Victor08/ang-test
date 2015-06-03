var _           = require('lodash');
var crypto      = require('crypto');
var http        = require('http');
var querystring = require('querystring');

var TwitterApi = function(userId, screenName, oauthAccessToken, oauthAccessTokenSecret, consumerKey, consumerSecret, count){
    console.log('building twitter api');
    _.merge(this.config, {
        userId: userId,
        screenName: screenName,
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

    get: function(url, urlPath, queryParams) {

        var that = this;

        if (_.isUndefined(url)) {
            console.error('url is not defined');
            return;
        }

        var baseUrl = this.config.baseUrl + urlPath;
        var fullUrl = this.config.baseUrl + url;

        var now = new Date().getTime();

        var oauth = {
            oauth_consumer_key: that.config.consumerKey,
            oauth_nonce: now,
            oauth_signature_method: 'HMAC-SHA1',
            oauth_token: that.config.oauthAccessToken,
            oauth_timestamp: now,
            oauth_version: '1.0'
        };

        var baseInfo = this.buildBaseString(baseUrl, 'GET', _.merge(oauth, queryParams));
        var compositeKey = encodeURIComponent(this.config.consumerSecret) + '&' + encodeURIComponent(this.config.oauthAccessTokenSecret);
        oauth['oauth_signature'] = crypto.createHmac('sha1', compositeKey).update(baseInfo).digest('base64');

        //var header = [
        //    this.buildOauthHeader(oauth),
        //    'Expect:'
        //];

        http.get(fullUrl, function(response){
            return response
        });

        return '123123';
    }

};
TwitterApi.prototype.config = {
    baseUrl: 'https://api.twitter.com/1.1',
    count: 5
};
module.exports = TwitterApi;