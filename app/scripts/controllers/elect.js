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


	var tmpCandidatesArray = [{firstname:'fna', lastname:'lna'}, {firstname:'fnb', lastname:'lnb'}];
    
    $scope.election = new Election(tmpCandidatesArray);

   	console.log( '>' + JSON.stringify($scope.election) );

   	$scope.election.placeVote();

  });
