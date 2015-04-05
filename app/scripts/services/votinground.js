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

    var VotingRound = function( thisVotePref, thisCandidatesArray) {
        // Public properties, assigned to the instance ('this')

        this.initialize = function(thisVotePref, thisCandidatesArray) {
          this.votePref = thisVotePref.slice();
          this.candidatesArray = thisCandidatesArray.slice();
        };

        /**
        * @desc determine candidate to be eliminted.
        * @param candidates for this round.
        */
        this.eliminateCandidate = function() {
            var leastVoteAmount = Number.MAX_VALUE;
            angular.forEach(this.candidatesArray, ( function(thisCandidate) {
                if (this.votePref[0][thisCandidate.key].length<leastVoteAmount) {
                  leastVoteAmount = this.votePref[0][thisCandidate.key].length;
                }
            }).bind(this)); 

            // store least votes count for this round.
            this.leastVoteAmount = leastVoteAmount;
         };

        /**
        * @desc determinate if candidate is to be eliminated in this round. 
        * @param candidate key.
        * @return  char representation of eliminated candidate.
        */
        this.showEliminated = function(candidateKey) {
          if (this.votePref[0][candidateKey].length<=this.leastVoteAmount){
            return 'X';
          } 
          return '';
        };

        /**
        * @desc determinate if candidate is to be elected in this round. 
        * @param candidate key.
        * @return  char representation of elected candidate.
        */
        this.showElected= function(droopQuota, candidateKey) {
          if (this.votePref[0][candidateKey].length>=droopQuota){
            return 'X';
          } 
          return '';
        };

       /**
        * @desc has a candidate enough votes to be eleceted.
        * @param droopQuota value
        * @return true if candidate is elected, otherwise false.
        */
        this.isCandidateElected = function ( droopQuota ) {
          var quotaMet = this.candidatesArray.some( function( thisCandidate ) { 
            if ( this.votePref[0][thisCandidate.key].length >= droopQuota) {
              return true;
            }
            return false;
          }.bind(this)); 

          return quotaMet;
        };

        // Call the initialize function for every new instance
        this.initialize(thisVotePref, thisCandidatesArray);
    };


    // Public API here
    return VotingRound;

  });
