var _           = require('lodash');
var cryptojs    = require('cryptojs');
var http        = require('http');
var querystring = require('querystring');

var util = require('util');

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

    console.log('arrays merged', util.inspect(this.config, false, null) );

};



TwitterApi.prototype = {

    test: function(){
        console.log('my request url', this.requestUrl);
    },

    buildBaseString: function(baseUrl, method, params){
        var result = [];
        _.each(params, function (val, key){
            result.append(key + '=' + encodeURIComponent(val));
        });
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
        console.log('now getting twits');

        if (_.isUndefined(url)) {
            console.error('url is not defined');
            return;
        }
        if (this.config.whitelist.indexOf(url) == -1) {
            console.error('url is restricted');
            return;
        }
        var baseUrl = this.baseUrl + urlPath;
        var fullUrl = this.baseUrl + url;

        var oauth = {
            oauth_consumer_key: this.config.consumerKey,
            oauth_nonce: new Date().getTime(),
            oauth_signature_method: 'HMAC-SHA1',
            oauth_token: this.config.oauthAccessToken,
            oauth_timestamp: new Date().getTime(),
            oauth_version: '1.0'
        };

        var baseInfo = this.buildBaseString(baseUrl, 'GET', _.merge(oauth, queryParams));
        var compositeKey = encodeURIComponent(this.config.consumerSecret) + '&' + encodeURIComponent(this.config.oauthAccessTokenSecret);
        var sha1 = cryptojs.HmacSHA1(baseInfo, compositeKey);
        oauth['oauth_signature'] = sha1.toString(cryptojs.enc.Base64);

        var header = [
            this.buildOauthHeader(oauth),
            'Expect:'
        ];

        var request = http.get(fullUrl, function(response){
            return response
        })
    }

};
TwitterApi.prototype.config = {
    baseUrl: 'https://api.twitter.com/1.1/',
    count: 5
};
module.exports = TwitterApi;