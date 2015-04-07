'use strict';

/**
 * @ngdoc function
 * @name stvApp.controller:ElectCtrl
 * @description
 * # ElectionSetupCtrl
 * Controller of the stvApp
 */
angular.module('stvApp')
  .controller('ElectionSetupCtrl',['$scope', 'ElectionService', '$location', function ($scope, ElectionService, $location) {

    $scope.numberOfCandidates = 3;
    $scope.seatsToFill = 2;
    $scope.voteCount = 5;


    $scope.navigateToResults = function ( ) {
      ElectionService.createElection($scope.numberOfCandidates, $scope.seatsToFill, $scope.voteCount);
      $location.path( 'results' );
    };

  }]);
