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
  
    $scope.election = new Election(3, 2, 5);


    $scope.onParamaterChanged = function() {
      $scope.election = new Election($scope.election.numberOfCandidates, $scope.election.seatsToFill, $scope.election.voteCount);
    };

  });
