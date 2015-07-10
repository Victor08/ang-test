var menuConfig = angular.module('myConfig', []);

menuConfig.constant('menuConfig', [
        {
            title: 'twitterOwn',
            route: '/twitter-own'
        },
        {
            title: 'twitterNPM',
            route: '/twitter-npm'
        }
    ]
);