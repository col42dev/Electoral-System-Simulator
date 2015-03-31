'use strict';

angular.module('stvApp')
.factory('Candidate', function () {
 
  /**
   * Constructor, with class name
   */
  function Candidate(firstName, lastName) {
    // Public properties, assigned to the instance ('this')
    this.firstName = firstName;
    this.lastName = lastName;
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