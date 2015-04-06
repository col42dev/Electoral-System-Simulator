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
    this.eliminated = false;
    this.elected = false;

  }
 
  /**
   * Public method, assigned to prototype
   */
  Candidate.prototype.getFullName = function () {
    return this.firstName + ' ' + this.lastName;
  };


 
  /**
   * Return the constructor function
   */
  return Candidate;
});