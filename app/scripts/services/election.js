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

      angular.forEach(candidates, (function(thisCandidate) {
        this.candidatesArray.push(new Candidate(thisCandidate));
       }).bind(this)); 
    };

    this.placeVote = function(candidateObject) {
      console.log('Election Factory create Vote');

      this.voteArray = [];

      this.voteArray.push( new Vote(candidateObject));

    };


        // Call the initialize function for every new instance
    this.initialize();
  };


   /**
   * Return the constructor function.
   */
   return Election;
});