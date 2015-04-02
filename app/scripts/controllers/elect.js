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


	  var tmpCandidatesArray = [{key: 0, firstName:'fna', lastName:'lna'}, {key: 1, firstName:'fnb', lastName:'lnb'}, {key: 2, firstName:'fnc', lastName:'lnc'}];
    
    $scope.election = new Election(tmpCandidatesArray);

   	console.log( '>' + JSON.stringify($scope.election) );


    $scope.voteCountChange = function() {
      console.log($scope.election.voteCount);
      $scope.election.placeVotes();
    };

  });
