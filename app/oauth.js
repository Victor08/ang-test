var crypto = require('ctypto');


var Oauth = function(){

};

Oauth.prototype = {

    buildSignature: function(params){
        var method = params.method.toUpperCase();
        var url = encodeURIComponent(params.url);
        var query = encodeURIComponent(params.query);
        var baseString = method + '&' + url + '&' + query;

        var consumerKey = encodeURIComponent(params.consumerKey);
        var consumerSecret = encodeURIComponent(params.consumerSecret);
        var signingKey = consumerKey + '&' + consumerSecret;

        var signature = crypto.createHmac('sha1', signingKey).update(baseString).digest('base64');

        return signature;
    }

};

module.exports = Oauth;