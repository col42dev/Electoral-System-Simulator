'use strict';

angular.module('stvApp')
.factory('Election', function (Candidate, Vote, VotingRound) {


  /**
   * Constructor, with class name
   */
  var Election = function(candidateCount) {
    // Public properties, assigned to the instance ('this')



    this.initialize = function() {
      console.log('Factory create Election');

      this.numberOfCandidates = candidateCount;
      var candidates = []; //[{key: 0, firstName:'fna', lastName:'lna'}, {key: 1, firstName:'fnb', lastName:'lnb'}, {key: 2, firstName:'fnc', lastName:'lnc'}];
 
      function generateFirstName() {
        var names = ['Noah', 'Sophia', 'Liam', 'Emma', 'Jacob', 'Olivia'];
        return names[Math.floor(Math.random() * names.length)];
      }

      function generateLastName() {
        var names = ['Smith', 'Johnson', 'Williams', 'Jones', 'Brown', 'Davis'];
        return names[Math.floor(Math.random() * names.length)];
      }

      for ( var candidateIndex=0; candidateIndex < this.numberOfCandidates; candidateIndex++) {
        var candidate = { key: candidateIndex, firstName: generateFirstName(), lastName: generateLastName()};
        candidates.push( candidate );
      }
 


      this.candidatesArray = [];

      angular.forEach(candidates, ( function(thisCandidate) {
        this.candidatesArray.push(new Candidate(thisCandidate));
       }).bind(this)); 

      this.voteCount = 5; 
      this.seatsToFill = 1;
      this.droopQuota = 0;

      // place votes
      this.placeVotes();
    };

    this.placeVotes  = function() {
     

      // Reset votes...

      //initilaize vote pref data store
      this.votePref = []; // index 0: vote pref; index 1: hash map of key of candidate; value: tally of votes for combination of vote pref and candidate.
      angular.forEach(this.candidatesArray, ( function() {
          this.votePref.push( {} );
        }).bind(this)); 
      
      angular.forEach(this.candidatesArray, ( function(thisCandidate) {
        for ( var votePreferenceIndex=0; votePreferenceIndex < this.candidatesArray.length; votePreferenceIndex++) {
          this.votePref[votePreferenceIndex][thisCandidate.key] = 0;
        }
       }).bind(this)); 

      // Generate votes.
      for (var voterIndex = 0; voterIndex < this.voteCount; voterIndex++ ) {
        // for this voter, randomly generate ranking of available candidates.
        var voterOptionsArray = this.candidatesArray.slice();

        for ( var votePreferenceIndex=0; votePreferenceIndex < this.candidatesArray.length; votePreferenceIndex++) {
            var randomCandidateIndex = Math.floor(Math.random() * voterOptionsArray.length);
            var candidateKey = voterOptionsArray[randomCandidateIndex].key ;
            this.votePref[ votePreferenceIndex ][ candidateKey ] += 1;
            voterOptionsArray.splice(randomCandidateIndex, 1);
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