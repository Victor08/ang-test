var menuConfig = angular.module('myConfig', []);

menuConfig.constant('menu', [
        {
            title: 'twitterNPM',
            route: '#/twitter-npm'
        },
        {   title: 'twitterOwn',
            route: '#/twitter-own'
        }
    ]
);