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

    var VotingRound = function( droopQuota) {
        // Public properties, assigned to the instance ('this')

        this.initialize = function(droopQuota) {
          this.droopQuota = droopQuota;
        };

        // Call the initialize function for every new instance
        this.initialize(droopQuota);
    };


    // Public API here
    return VotingRound;

  });
