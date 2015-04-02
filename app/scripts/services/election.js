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

      this.voteCount = 12;

      // place votes
      this.placeVotes();
    };

    this.placeVotes  = function() {
      this.voteArray = [];
      var voteIndex = 0;
      for (; voteIndex < this.voteCount; voteIndex ++) {
        var randomCandidateIndex = Math.floor(Math.random() * this.candidatesArray.length);
        console.log('randomCandidateIndex = ' + randomCandidateIndex);
        this.placeVote( this.candidatesArray[randomCandidateIndex] );
      }
    };

    this.placeVote = function(candidateObject) {
      console.log('Election Factory create Vote');

      this.voteArray.push( new Vote(candidateObject) );
    };


    // Call the initialize function for every new instance
    this.initialize();
  };


   /**
   * Return the constructor function.
   */
   return Election;
});