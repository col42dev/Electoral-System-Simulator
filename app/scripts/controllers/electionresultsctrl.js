'use strict';

/**
 * @ngdoc function
 * @name stvApp.controller:ElectionresultsCtrl
 * @description
 * # ElectionResultsCtrl
 * Controller of the stvApp
 */
angular.module('stvApp')
  .controller('ElectionResultsCtrl', ['$scope', 'ElectionService', function ($scope,  ElectionService) {

  	$scope.election = ElectionService.election;

  }]);
