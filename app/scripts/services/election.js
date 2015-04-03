'use strict';

angular.module('stvApp')
.factory('Election', function (Candidate, Vote) {


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
      for (; voteIndex < this.voteCount; voteIndex ++) {
        var randomCandidateIndex = Math.floor(Math.random() * this.candidatesArray.length);
        this.placeVote( this.candidatesArray[randomCandidateIndex] );
      }

      //Calc Droop quota
      this.updateDroopQuota();

    };

    this.placeVote = function(candidateObject) {
      this.voteArray.push( new Vote(candidateObject) );
      candidateObject.voteCount += 1;
    };

    this.updateDroopQuota = function() {
      this.droopQuota = (this.voteCount / (this.seatsToFill + 1)) + 1;
    };


    // Call the initialize function for every new instance
    this.initialize();
  };


   /**
   * Return the constructor function.
   */
   return Election;
});