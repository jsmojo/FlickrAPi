var myApp = angular.module('theApp', ['ui.router', 'mainCtrls']);

myApp.config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {

    $urlRouterProvider.otherwise('/');

    $stateProvider

        .state('home', {
        url: '/',
        views: {
            // the main template will be placed here (relatively named)
            '': {
                templateUrl: 'views/layout/home.ejs',
                controller: 'OneController'
            },

            'navContent@home': {
                templateUrl: 'views/includes/header.ejs'
            },
            'footerContent@home': {
                templateUrl: 'views/includes/footer.ejs'
            }
        }

    })

}]);
