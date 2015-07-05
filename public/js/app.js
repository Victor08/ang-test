
var tweetApp = angular.module('twitty',['ngResource', 'ngRoute', 'twitControllers', 'twitDirectives', 'twitServices', 'myConfig' ]);

tweetApp.config(['$routeProvider', function($routeProvider){
    $routeProvider
        .when('/twitter-own', {
            templateUrl: '/template/list/main.html',
            controller: 'userTimelineCtrl'
        })
        .when('/twitter-npm', {
            templateUrl: '/template/twitterNPM/twitterNPM',
            controller: 'twitterMPMCtrl'
        })
        .otherwise({
            redirectTo: '/twitter-own'
        })
}]);


