
var tweetApp = angular.module('twitty',['ngResource', 'ngRoute', 'twitControllers', 'twitDirectives', 'twitServices']);

tweetApp.config(['$routeProvider', function($routeProvider){
    $routeProvider
        .when('/twitter-own', {
            templateUrl: '/template/twitterOwn/twitterOwn.html',
            controller: 'userTimelineCtrl'
        })
        .when('/twitter-npm', {
            templateUrl: '/template/twitterNPM/twitterNPM.html',
            controller: 'twitterNPMCtrl'
        })
        .otherwise({
            redirectTo: '/twitter-own'
        })
}]);


