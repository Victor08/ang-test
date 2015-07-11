'use strict';

/* Controllers */

var twitControllers = angular.module('twitControllers',['myConfig']);

twitControllers.controller('userTimelineCtrl', ['$scope', 'ApplicationRequestTweets', function($scope, Search){
    console.log('user timeline ctrl');
    $scope.twitterSearch = '';
    var getTwitterSearch = function(query){
        return Search.get({query: 'q=' + query});
    };
    $scope.launchSearch = function(){
        var response = Search.get({query: 'q=' + $scope.twitterSearch});
        $scope.tweets = response;
        console.log('scope tweets', $scope.tweets, '\n', response);
    };
}]);

twitControllers.controller('userRequestCtrl', ['$scope', 'UserRequestTweets', function($scope, UserRequestTweets) {
    var getUserRequest = function(query) {
        return UserRequestTweets.get({query: 'q=' + query});
    };
    $scope.launchSearch = function(){
        var response = UserRequestTweets.get({query: 'screen_name=' + $scope.twitterSearch});
        $scope.tweets = response;
        console.log('scope tweets', $scope.tweets, '\n', response);
    };
}]);

twitControllers.controller('twitterNPMCtrl', ['$scope', 'twitterNPMResource', function($scope, resource){

    $scope.tweets = resource.get({
        path: 'statuses/user_timeline',
        query: 'count=10&screen_name=imtiredofthinki'
    });

    $scope.postTweet = function(){
        resource.get(
            {
                path: 'statuses/update',
                query: 'status=' + $scope.newTweet
            },
            function (data) {
                if (data.status === 'OK') {
                    $scope.tweets.statuses.unshift(data.tweet);

                } else {
                    console.error(data.message);
                }
            }
        )
    };

    $scope.removeTweet = function(tweetId){
        resource.get(
            {
                path: 'statuses/destroy/' + tweetId
            },
            function (data) {
                if (data.status === 'OK') {
                    $scope.tweets.statuses = _.filter($scope.tweets.statuses, function(element){
                        return (element.id_str !== tweetId) ;
                    })
                } else {
                    console.error(data.message);
                }
            }
        )
    }
}]);

twitControllers.controller('horizontalMenuCtrl', ['$scope', '$location', 'menuConfig', function ($scope, $location, menu) {
    var location = $location.path();
    $scope.menuItems = menu;
    _.each($scope.menuItems, function(item, key){
        if (location.indexOf(item.route) > -1) {
            item.active = true;
        } else {
            item.active = false;
        }
    });
} ]);

