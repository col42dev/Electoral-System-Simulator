'use strict';

/**
 * @ngdoc function
 * @name stvApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the stvApp
 */
angular.module('stvApp')
  .controller('AboutCtrl', function ($scope) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  });
