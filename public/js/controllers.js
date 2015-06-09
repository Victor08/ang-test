'use strict';

/* Controllers */

var twitControllers = angular.module('twitControllers',[]);

twitControllers.controller('resourceCtrl', function($scope, Tweet) {

});

twitControllers.controller('userTimelineCtrl', ['$scope', '$http', 'UserTimeline', 'SearchTweets', function($scope, $http, resource, search){
    console.log('user timeline ctrl');

    $scope.twitterSearch = '';

    var getTwitterSearch = function(query){
        return search.get({query: '?q=' + query});
    };

    var renderTwitterSearch = function(response) {

    };

    $scope.launchSearch = function(){
        getTwitterSearch($scope.twitterSearch)
            .then(renderTwitterSearch(response))
    };



}]);

twitControllers.controller('deleteCtrl', ['$scope', '$routeParams', function($scope, $routeParams){

}]);