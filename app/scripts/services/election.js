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

      //Generate random candiates
      var candidates = []; 
 
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

    this.getCandidate = function( candidateKey) {

      var candidateWithKey = 0;
      angular.forEach(this.candidatesArray, ( function(thisCandidate) {
        if (thisCandidate.key === candidateKey) {
          candidateWithKey = thisCandidate;
        }
      }).bind(this)); 
      return candidateWithKey;
    };

    this.placeVotes  = function() {
     

      // Reset votes...

      // initialise votes data store
      this.votesArray = [];

      //initilaize vote pref data store
      this.votePref = []; // index 0: vote pref; index 1: hash map of key of candidate; value: tally of votes for combination of vote pref and candidate.

      angular.forEach(this.candidatesArray, ( function() {
          this.votePref.push( {} );
        }).bind(this)); 
      
      angular.forEach(this.candidatesArray, ( function(thisCandidate) {
        for ( var votePreferenceIndex=0; votePreferenceIndex < this.candidatesArray.length; votePreferenceIndex++) {
          this.votePref[votePreferenceIndex][thisCandidate.key] = [];
        }
       }).bind(this)); 

      // Generate votes.
      for (var voterIndex = 0; voterIndex < this.voteCount; voterIndex++ ) {
        // for this voter, randomly generate ranking of available candidates.
        var voterOptionsArray = this.candidatesArray.slice();

        var thisVote = [];

        for ( var votePreferenceIndex=0; votePreferenceIndex < this.candidatesArray.length; votePreferenceIndex++) {
            var randomCandidateIndex = Math.floor(Math.random() * voterOptionsArray.length);
            var candidateKey = voterOptionsArray[randomCandidateIndex].key ;
            thisVote.push(candidateKey);
            voterOptionsArray.splice(randomCandidateIndex, 1);
        }
        this.votesArray.push( thisVote); 
      }

      // build votePref mapping table from votes
      this.votesArray.forEach( function(thisVote) {
        thisVote.forEach( function(candidateKey, preferenceIndex) {
            this.votePref[ preferenceIndex ][ candidateKey ].push(thisVote);
          }.bind(this));
        }.bind(this));

      // results resolution
      this.voteResolutionRounds = [];
      var latestVotingRound = new VotingRound( this.votePref );
      this.voteResolutionRounds.push(latestVotingRound);

      while ( this.voteResolutionConditionsMet() === false) {

        console.log('>>>>>>>>NEXT ROUND');

        // create new round
        var thisVotingRound = new VotingRound( latestVotingRound.votePref );
        this.voteResolutionRounds.push(thisVotingRound);

        // transfer any surplus votes to other candidates

        break; // for now only handle up to one additonal round
      }

    };

    this.meetsQuota = function( numberVotes ) {
      if ( numberVotes >= this.getDroopQuota() ) {
        return 'X';
      }
      return '';
    };
 
    this.voteResolutionConditionsMet = function ( ) {

      var quotaMet = this.candidatesArray.some( function( thisCandidate ) { 
          if ( this.votePref[0][thisCandidate.key].length >= this.getDroopQuota()) {
            return true;
          }
          return false;
        }.bind(this)); 

      return quotaMet;
    };


    this.getDroopQuota = function() {
      return Math.floor((this.voteCount / (this.seatsToFill + 1)) + 1);
    };


    // Call the initialize function for every new instance
    this.initialize();
  };


   /**
   * Return the constructor function.
   */
   return Election;
});