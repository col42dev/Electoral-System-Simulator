'use strict';

/**
 * @ngdoc overview
 * @name stvApp
 * @description
 * # stvApp
 *
 * Main module of the application.
 */
angular
  .module('stvApp', [
    'ngAnimate',
    'ngAria',
    'ngCookies',
    'ngMessages',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      })
      .when('/about', {
        templateUrl: 'views/about.html',
        controller: 'AboutCtrl'
      })
      .when('/elect', {
        templateUrl: 'views/elect.html',
        controller: 'ElectCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
