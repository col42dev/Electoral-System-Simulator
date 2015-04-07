'use strict';

/**
 * @ngdoc function
 * @name stvApp.controller:ElectCtrl
 * @description
 * # ElectCtrl
 * Controller of the stvApp
 */
angular.module('stvApp')
  .controller('ElectCtrl',['$scope', 'ElectionService', '$location', function ($scope, ElectionService, $location) {
  
    //$scope.election = new Election(3, 2, 5);

    $scope.numberOfCandidates = 3;
    $scope.seatsToFill = 2;
    $scope.voteCount = 5;


    $scope.onParamaterChanged = function() {
    };

    $scope.navigateToResults = function ( ) {
      ElectionService.createElection($scope.numberOfCandidates, $scope.seatsToFill, $scope.voteCount);
      $location.path( 'results' );
      console.log('ff');
    };

  }]);
