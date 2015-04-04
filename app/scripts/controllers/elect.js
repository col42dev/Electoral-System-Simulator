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

   	//console.log( '>' + JSON.stringify($scope.election) );

    $scope.voteCountChange = function() {
      $scope.election.placeVotes();
    };

    $scope.seatsToFillChange = function() {
      $scope.election.placeVotes();
    };

    $scope.candidateCountChange = function() {
      $scope.election = new Election($scope.election.numberOfCandidates);
    };

  });
