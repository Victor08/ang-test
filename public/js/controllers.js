'use strict';

/* Controllers */

var twitControllers = angular.module('twitControllers',[]);

twitControllers.controller('resourceCtrl', function($scope, Tweet) {

});

twitControllers.controller('userTimelineCtrl', ['$scope', '$http', 'UserTimeline', 'SearchTweets', function($scope, $http, resource, search){
    console.log('user timeline ctrl');

    $scope.twitterSearch = '';
    $scope.tweets = {};

    var getTwitterSearch = function(query){
        return search.get({query: 'q=' + query});
    };

    $scope.launchSearch = function(){
        var response = search.get({query: 'q=' + $scope.twitterSearch})
        $scope.tweets = response.statuses;
        console.log('scope tweets', $scope.tweets, '\n', response);
    };



}]);

twitControllers.controller('deleteCtrl', ['$scope', '$routeParams', function($scope, $routeParams){

}]);