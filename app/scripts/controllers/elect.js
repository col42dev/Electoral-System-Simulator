'use strict';

/**
 * @ngdoc function
 * @name stvApp.controller:ElectCtrl
 * @description
 * # ElectCtrl
 * Controller of the stvApp
 */
angular.module('stvApp')
  .controller('ElectCtrl', function ($scope, Election) {

    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];


	$scope.candidatesArray = [{firstname:'sdgds', lastname:'lastafdg'}, {firstname:'sdg', lastname:'lastagdfs'}];
    $scope.election = new Election($scope.candidatesArray);

  });
