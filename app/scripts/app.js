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
      .when('/elect', {
        templateUrl: 'views/election setup.html',
        controller: 'ElectionSetupCtrl'
      })
      .when('/results', {
        templateUrl: 'views/election results.html',
        controller: 'ElectionResultsCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
