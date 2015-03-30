'use strict';

/**
 * @ngdoc function
 * @name stvApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the stvApp
 */
angular.module('stvApp')
  .controller('MainCtrl', function ($scope) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  });
