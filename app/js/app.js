
var tweetApp = angular.module('twitty',['ngResource', 'ngRoute', 'twitControllers', 'twitDirectives', 'twitServices' ]);

tweetApp.config(['$routeProvider', function($routeProvider){
    $routeProvider
        .when('/tweets', {
            templateUrl: 'templates/list/main.html',
            controller: 'listCtrl'
        })
        .when('/', {
            templateUrl: 'templates/list/main.html',
            controller: 'listCtrl'
        })
}]);
