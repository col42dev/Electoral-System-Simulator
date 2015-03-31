'use strict';

angular.module('stvApp')
.factory('Election', function (Candidate) {


  //this.candidatesArray = [];
  /**
   * Constructor, with class name
   */
  function Election(candidates) {
    // Public properties, assigned to the instance ('this')

    console.log('Factory create Election');

    
    this.candidatesArray = [];

    angular.forEach(candidates, (function(thisCandidate) {
    	this.candidatesArray.push(new Candidate(thisCandidate.firstname, thisCandidate.lastname));
      //console.log(thisCandidate.firstname + ' ' + thisCandidate.lastname);
	   }).bind(this)); 
  }


   /**
   * Return the constructor function.
   */
   return Election;
});