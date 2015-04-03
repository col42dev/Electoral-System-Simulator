'use strict';

angular.module('stvApp')
.factory('Candidate', function () {
 
  /**
   * Constructor, with class name
   */
  function Candidate(candidateObj) {
    // Public properties, assigned to the instance ('this')
    this.key = candidateObj.key;
    this.firstName = candidateObj.firstName;
    this.lastName = candidateObj.lastName;

    this.resetVotes();
  }
 
  /**
   * Public method, assigned to prototype
   */
  Candidate.prototype.getFullName = function () {
    return this.firstName + ' ' + this.lastName;
  };

  Candidate.prototype.resetVotes = function () {
    this.voteCount = 0;
  };
 
  Candidate.prototype.getVoteCount = function () {
    return this.voteCount;
  };

 
  /**
   * Return the constructor function
   */
  return Candidate;
});