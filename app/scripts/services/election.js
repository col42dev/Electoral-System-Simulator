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

      // Reset Candidate votes
      angular.forEach(this.candidatesArray, ( function(thisCandidate) {
        thisCandidate.resetVotes();
       }).bind(this)); 

     

      // Generate Votes
      this.voteArray = [];
      var voteIndex = 0;
      for (; voteIndex < this.voteCount; voteIndex++ ) {
        var randomCandidateIndex = Math.floor(Math.random() * this.candidatesArray.length);
        this.placeVote( this.candidatesArray[randomCandidateIndex] );
      }

      // results resolution
      this.voteResolutionRounds = [];
      while ( !this.voteResolutionConditionsMet( this.calcDroopQuota( ))) {

      }

    };

    this.voteResolutionConditionsMet = function ( roundDroopQuota) {
      this.voteResolutionRounds.push( new VotingRound( roundDroopQuota));

      angular.forEach(this.candidatesArray, ( function(thisCandidate) {
        if ( thisCandidate.getVoteCount() > roundDroopQuota) {
          return 1;
        }
       }).bind(this)); 

        // remove the canidate with teh fewest votes and transfer their votes.

      return 1; // todo: return 0 when round end update is implemented.
    };

    this.placeVote = function(candidateObject) {
      this.voteArray.push( new Vote(candidateObject) );
      candidateObject.voteCount += 1;
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