'use strict';

/**
 * @ngdoc service
 * @name stvApp.ElectionService
 * @description
 * # ElectionService
 * Service in the stvApp.
 */
angular.module('stvApp')
  .service('ElectionService', function ( ElectionFactory) {
    // AngularJS will instantiate a singleton by calling "new" on this function

     this.createElection = function( numberOfCandidates, seatsToFill, voteCount) {
     	console.log('ElectionService - create election');
        this.election = new ElectionFactory( numberOfCandidates, seatsToFill, voteCount);
    };
  });
