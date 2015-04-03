'use strict';

angular.module('stvApp')
.factory('Election', function (Candidate, Vote, VotingRound) {


  /**
   * Constructor, with class name
   */
  var Election = function(candidates) {
    // Public properties, assigned to the instance ('this')

    this.initialize = function() {
      console.log('Factory create Election');

      this.candidatesArray = [];

      angular.forEach(candidates, ( function(thisCandidate) {
        this.candidatesArray.push(new Candidate(thisCandidate));
       }).bind(this)); 

      this.voteCount = 0; 
      this.seatsToFill = 1;
      this.droopQuota = 0;

      // place votes
      this.placeVotes();
    };

    this.placeVotes  = function() {
     

      // Reset votes

      //initilaize vote pref data store
      this.votePref = []; // index 0: vote pref; index 1: hash map of key of candidate; value: tally of votes for combination of vote pref and candidate.
      angular.forEach(candidates, ( function() {
          this.votePref.push( {} );
        }).bind(this)); 
      
      angular.forEach(candidates, ( function(thisCandidate) {
        for ( var votePreferenceIndex=0; votePreferenceIndex < this.candidatesArray.length; votePreferenceIndex++) {
          this.votePref[votePreferenceIndex][thisCandidate.key] = 0;
        }
       }).bind(this)); 

      // Generate votes
      for (var voteIndex = 0; voteIndex < this.voteCount; voteIndex++ ) {
        for ( var votePreferenceIndex=0; votePreferenceIndex < this.candidatesArray.length; votePreferenceIndex++) {
            var randomCandidateIndex = Math.floor(Math.random() * this.candidatesArray.length);
            var candidateKey = this.candidatesArray[randomCandidateIndex].key ;
            this.votePref[ votePreferenceIndex ][ candidateKey ] += 1;
        }
      }

      // results resolution
      this.voteResolutionRounds = [];
      while ( !this.voteResolutionConditionsMet( this.calcDroopQuota( ))) {

      }

    };


    this.voteResolutionConditionsMet = function ( roundDroopQuota) {
      this.voteResolutionRounds.push( new VotingRound( roundDroopQuota));

/*
      angular.forEach(this.candidatesArray, ( function(thisCandidate) {
        if ( thisCandidate.getVoteCount() > roundDroopQuota) {
          return 1;
        }
       }).bind(this)); 
*/

        // remove the canidate with the fewest votes and transfer their votes.

      return 1; // todo: return 0 when round end update is implemented.
    };

    this.calcDroopQuota = function() {
      return  Math.floor((this.voteCount / (this.seatsToFill + 1)) + 1);
    };

    this.getDroopQuota = function( votingRoundIndex) {
      return this.voteResolutionRounds[votingRoundIndex].droopQuota;
    };


    // Call the initialize function for every new instance
    this.initialize();
  };


   /**
   * Return the constructor function.
   */
   return Election;
});