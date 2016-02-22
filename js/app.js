var app = angular.module('ToDo', ['ngRoute','ui.bootstrap']);

app.config(function ($routeProvider) {
    $routeProvider

        .when('/', {
            templateUrl: 'views/mistareas.html',
            controller: 'todoctrl',
            contollerAs: 'ctrl1'
        })
        .when('/NewToDo', {
            templateUrl: 'views/registro.html',
            controller: 'registroctrl'
        })
        .otherwise({
            templateUrl: 'views/mistareas.html',
            controller: 'todoctrl',
            contollerAs: 'ctrl1'
        });
});