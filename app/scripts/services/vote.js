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


    var Vote = function(orderedCandidatePreferenceArray) {
        // Public properties, assigned to the instance ('this')

        this.initialize = function(orderedCandidatePreferenceArray) {
          this.preferences = orderedCandidatePreferenceArray;  
        };

        // Call the initialize function for every new instance
        this.initialize(orderedCandidatePreferenceArray);
    };


    // Public API here
    return Vote;

  });
