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
     

      // Generate Votes
      this.votePrefFirst = {};
      this.votePrefSecond = {};
      angular.forEach(candidates, ( function(thisCandidate) {
        this.votePrefFirst[thisCandidate.key] = 0;
        this.votePrefSecond[thisCandidate.key] = 0;
       }).bind(this)); 

      var voteIndex = 0;
      for (; voteIndex < this.voteCount; voteIndex++ ) {
        var firstPreferenceCandidateIndex = Math.floor(Math.random() * this.candidatesArray.length);
        var secondPreferenceCandidateIndex = Math.floor(Math.random() * this.candidatesArray.length);

        this.votePrefFirst[ this.candidatesArray[firstPreferenceCandidateIndex].key ] += 1;
        this.votePrefSecond[ this.candidatesArray[secondPreferenceCandidateIndex].key ] += 1;
      }

      //log results
      angular.forEach(candidates, ( function(thisCandidate) {
        console.log( thisCandidate.key + ' first ' + this.votePrefFirst[thisCandidate.key]);
        console.log( thisCandidate.key + ' seconds ' + this.votePrefSecond[thisCandidate.key]);
   
       }).bind(this)); 

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