var _ = require('lodash');

var TwitterApi = function(userId, screenName, oauthAccessToken, oauthAccessTokenSecret, consumerKey, consumerSecret, count, requestPath){
    _.merge(this.config, {
        userId: userId,
        screenName: screenName,
        oauthAccessToken: oauthAccessToken,
        oauthAccessTokenSecret: oauthAccessTokenSecret,
        consumerKey: consumerKey,
        consumerSecret: consumerSecret
    });

    this.config.whitelist.append('statuses/user_timeline.json?user_id=' + this.config.userId + '&screen_name=' + this.config.screenName + '&count=' + this.config.count);

    this.requestPath = requestPath;
};

TwitterApi.prototype.config = {
    whitelist: [],
    useWhitelist: true,
    baseUrl: 'https://api.twitter.com/1.1/',
    count: 5
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

    apiGet: function(url) {
        var baseUrl = this.baseUrl + this.requestPath;

        if (_.isUndefined(url)) {
            console.error('url is not defined');
            return;
        }
        if (this.config.whitelist.indexOf(url) == -1) {
            console.error('url is restricted');
            return;
        }

        var oauth = {
            oauth_consumer_key: this.config.consumerKey,
            oauth_nonce: new Date().getTime(),
            oauth_signature_method: 'HMAC-SHA1',
            oauth_token: this.config.oauthAccessToken,
            oauth_timestamp: new Date().getTime(),
            oauth_version: '1.0'
        };

        var baseInfo = this.buildBaseString(baseUrl, 'GET', )
    }

};

module.exports = new TwitterApi();