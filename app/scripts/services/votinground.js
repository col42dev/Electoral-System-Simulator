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

         this.eliminateCandidate = function( candidatesArray) {

            var leastVoteAmount = Number.MAX_VALUE;
            angular.forEach(candidatesArray, ( function(thisCandidate) {
                if ( this.votePref[0][thisCandidate.key].length < leastVoteAmount) {
                  leastVoteAmount = this.votePref[0][thisCandidate.key].length;
                }
            }).bind(this)); 

            // store least votes count for this round.
            this.setLeastVoteAmount(leastVoteAmount);

         };

        this.showEliminated = function( candidateKey) {

          if ( this.votePref[0][candidateKey].length <=this.leastVoteAmount ){
            return 'X';
          } 

          return '';
        };

        this.setLeastVoteAmount = function( _leastVoteAmount) {
          this.leastVoteAmount = _leastVoteAmount;
        };

        // Call the initialize function for every new instance
        this.initialize(_votePref);
    };



    // Public API here
    return VotingRound;

  });
