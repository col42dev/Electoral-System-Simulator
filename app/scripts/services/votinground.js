'use strict';

/**
 * @ngdoc service
 * @name stvApp.VotingRound
 * @description
 * # VotingRound
 * Factory in the stvApp.
 */
angular.module('stvApp')
  .factory('VotingRound', function () {
    // Service logic
    // ...

    var VotingRound = function( _votePref) {
        // Public properties, assigned to the instance ('this')

        this.initialize = function(_votePref) {

          this.votePref = _votePref.slice();

        };

        // Call the initialize function for every new instance
        this.initialize(_votePref);
    };


    // Public API here
    return VotingRound;

  });
