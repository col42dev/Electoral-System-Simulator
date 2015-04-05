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
  
    $scope.election = new Election(3);


    $scope.candidateCountChange = function() {
       console.log('ElectCtrl cc='+$scope.election.numberOfCandidates);
      $scope.election = new Election($scope.election.numberOfCandidates);
    };

  });
