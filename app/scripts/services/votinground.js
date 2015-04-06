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

          // deep copy votePref
          this.votePref = [];
          angular.copy( thisVotePref, this.votePref);

          // deep copy candidateArray
          this.candidatesArray = [];
          angular.copy( thisCandidatesArray, this.candidatesArray);

          
          this.electedCandidates = []; // candidates elected during this round.
        };

        /**
        * @desc voting round resolution
        * @param droopQuota
        */
        this.process = function( droopQuota) {

          var eliminationVotesToTransfer = [];

          this.electedCandidates = this.getElectedCandidates( droopQuota);
          if ( this.electedCandidates.length > 0) {
              // flag elected candidates
              angular.forEach( this.electedCandidates, ( function( electedCandidate) { 
                electedCandidate.elected = true;
              }).bind( this)); 
          } else {
            // eliminate the candidate(s) with least votes.
            eliminationVotesToTransfer = this.processCandidateEliminaton();
          }

          console.log('>>>>>>>>NEXT ROUND');

          // create new round.
          var newVotingRound = new VotingRound( this.votePref, this.candidatesArray);

          // remove elected/elimiated candidates and transfer their votes.
          if ( this.electedCandidates.length > 0) {
            newVotingRound.removeElectedCandidates();
          } else {
            newVotingRound.removeEliminatedCandidate();
            if ( eliminationVotesToTransfer.length > 0) {
              newVotingRound.transferEliminationVotes( eliminationVotesToTransfer);
            }
          }

          return newVotingRound;
        };

        /**
        * @desc Generate list of elected candidates.
        * @param droopQuota value - number of votes required to be elected.
        * @return elected candidate array.
        */
        this.getElectedCandidates = function ( droopQuota ) {
          var electedCandidates = [];
          this.candidatesArray.some( function( thisCandidate ) { 
            if ( this.votePref[0][thisCandidate.key].length >= droopQuota) {
              electedCandidates.push( thisCandidate);
            }
          }.bind(this)); 

          return electedCandidates;
        };

        /**
        * @desc determine candidate to be eliminted.
        * @param candidates for this round.
        * @return array of votes to be transferred to other candidates,
        */
        this.processCandidateEliminaton = function() {
            var leastVoteAmount = Number.MAX_VALUE;
            angular.forEach(this.candidatesArray, ( function(thisCandidate) {
                if (this.votePref[0][thisCandidate.key].length<leastVoteAmount) {
                  leastVoteAmount = this.votePref[0][thisCandidate.key].length;
                }
            }).bind(this)); 

            // store least votes count for this round.
            this.leastVoteAmount = leastVoteAmount;

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


            // vote transfer
            var votesToTransfer = [];
            this.votePref[0][eliminatedCandidateKey].forEach( function( vote)  {
                votesToTransfer.push( vote);
              }.bind(this)
            );

            return votesToTransfer;
        };


        /**
        * @desc transfer votes from an eliminated candidate
        * @param  array of votes to be transfered.
        */
        this.transferEliminationVotes = function( votesToTransfer) {
          votesToTransfer.forEach( function( vote)  {
                var transferToCandidateKey = vote[1]; // need to handle cases where this candidate is already eliminated or elected.
                this.votePref[0][transferToCandidateKey].push(vote);
              }.bind(this)
            );
        };

        /**
        * @desc remove candidate which has been flagged for elimination.
        */
        this.removeEliminatedCandidate = function() {
            var eliminatedCandidateIndex = -1;
            angular.forEach(this.candidatesArray, ( function(thisCandidate, index) {
                if (thisCandidate.eliminated === true) {
                  eliminatedCandidateIndex = index;
                }
            }).bind(this)); 

            if (eliminatedCandidateIndex >= 0) {
              this.candidatesArray.splice(eliminatedCandidateIndex, 1);
            }
        };

        /**
        * @desc remove candidate(s) from this candidatesArray which are flagged as elected.
        */
        this.removeElectedCandidates = function( ) {

          // Remove candiadtes which are flagged as elected.
          // I couldn't find any high level functional way of doing this - hence, use of do/while with nested for...loop with break syntax.
          // todo: research high level constructs for this functionality.
            var removedCandidateThisIteration = false;
            do {
              removedCandidateThisIteration = false;
              for ( var candidatesArrayIndex = 0; candidatesArrayIndex < this.candidatesArray.length; candidatesArrayIndex++) {
                if ( this.candidatesArray[candidatesArrayIndex].elected ===  true) {
                  //console.log('Remove candidate ' + this.candidatesArray[candidatesArrayIndex].firstName + ' ' + this.candidatesArray[candidatesArrayIndex].lastName);
                  this.candidatesArray.splice( candidatesArrayIndex, 1);
                  removedCandidateThisIteration = true;
                  break;
                }
              }
            } while( removedCandidateThisIteration === true);
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
        * @desc render for elected candidate
        * @param candidate key.
        * @return char representation of elected candidate.
        */
        this.showElected = function(candidateKey) {
          var elected = this.candidatesArray.some( function( thisCandidate ) { 
            if ( thisCandidate.key === candidateKey) {
              if ( thisCandidate.elected === true) {
                return true;
              }
            }
            return false;
          }.bind(this)); 

          if ( elected === true) {
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
