'use strict';

/**
 * @ngdoc service
 * @name stvApp.Vote
 * @description
 * # Vote
 * Factory in the stvApp.
 */
angular.module('stvApp')
  .factory('Vote', function () {


    var Vote = function(candidateObject) {
        // Public properties, assigned to the instance ('this')

        this.initialize = function(candidateObject) {
          this.candidateKey = candidateObject.key;
        };

        // Call the initialize function for every new instance
        this.initialize(candidateObject);
    };


    // Public API here
    return Vote;

  });
