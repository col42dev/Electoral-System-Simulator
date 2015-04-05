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
        * @desc voting round resolution
        * @param droopQuota
        */
        this.processVoteResolution = function( droopQuota) {

          if ( this.isCandidateElected( droopQuota) === false) {
            // eliminate the candidate(s) with least votes.
            this.eliminateCandidate();
          }

          console.log('>>>>>>>>NEXT ROUND');

          // create new round
          var newVotingRound = new VotingRound( this.votePref, this.candidatesArray );

          return newVotingRound;
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
            console.log('LEAST VOTE Amount ' + this.leastVoteAmount);

            // Randomly select single candidate from list of candiadtes with the least votes.
            var potentialEliminationCandidateKeysArray = [];
            angular.forEach(this.candidatesArray, ( function(thisCandidate) {
                if (this.votePref[0][thisCandidate.key].length===this.leastVoteAmount) {
                  potentialEliminationCandidateKeysArray.push( thisCandidate.key);
                }
            }).bind(this)); 

            var eliminatedCandidateKey = potentialEliminationCandidateKeysArray[ Math.floor(Math.random() * potentialEliminationCandidateKeysArray.length)];

            // flag candidate as eliminated
            angular.forEach(this.candidatesArray, ( function(thisCandidate) {
                if (thisCandidate.key === eliminatedCandidateKey) {
                  thisCandidate.eliminated = true;
                }
            }).bind(this)); 
        
         };

        /**
        * @desc determinate if candidate is to be eliminated in this round. 
        * @param candidate key.
        * @return  char representation of eliminated candidate.
        */
        this.showEliminated = function(candidateKey) {

          var eliminated = this.candidatesArray.some( function( thisCandidate ) { 
            if ( thisCandidate.key === candidateKey) {
              if ( thisCandidate.eliminated === true) {
                return true;
              }
            }
            return false;
          }.bind(this)); 

          if ( eliminated === true) {
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

        // Call the initialize function for every new instance
        this.initialize(thisVotePref, thisCandidatesArray);
    };


    // Public API here
    return VotingRound;

  });
