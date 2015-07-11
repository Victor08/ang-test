var twitDirectives = angular.module('twitDirectives',[]);

twitDirectives.directive('mainHeader', function(){
    return {
        templateUrl: 'template/elements/main-header.html',
        transclude: true,
        restrict: 'E'
    };
});

twitDirectives.directive('tweetStatus', function(){
   return {
        templateUrl: 'template/elements/tweetStatus.html',
        restrict: 'E'
   }
});

twitDirectives.directive('horizontalMenu', function(){
    return {
        templateUrl: 'template/elements/horizontal-menu.html'
    }
});