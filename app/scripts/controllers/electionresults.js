'use strict';

/**
 * @ngdoc function
 * @name stvApp.controller:ElectionresultsCtrl
 * @description
 * # ElectionResultsCtrl
 * Controller of the stvApp
 */
angular.module('stvApp')
  .controller('ElectionResultsCtrl', ['$scope', 'Election', 'ElectionService', '$location', function ($scope, Election, ElectionService, $location) {

  	$scope.election = ElectionService.election;

  }]);
