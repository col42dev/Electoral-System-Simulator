'use strict';

/**
 * @ngdoc service
 * @name stvApp.Election
 * @description
 * # ElectionFactory
 * Factory in the stvApp.
 */

angular.module('stvApp')
.factory('ElectionFactory', function (Candidate, VotingRound) {


  /**
   * Constructor, with class name
   */
  var Election = function(candidateCount, seatsToFillCount, votesCount) {
    // Public properties, assigned to the instance ('this')



    this.initialize = function() {

      this.numberOfCandidates = candidateCount;

      /**
      * @desc Generate random candiates
      * @return 
      */
      function generatedCandidates( candidateCount) {
        var candidates = []; 
   
        function generateFirstName() {
          var names = ['Noah', 'Sophia', 'Liam', 'Emma', 'Jacob', 'Olivia'];
          return names[Math.floor(Math.random() * names.length)];
        }

        function generateLastName() {
          var names = ['Smith', 'Johnson', 'Williams', 'Jones', 'Brown', 'Davis'];
          return names[Math.floor(Math.random() * names.length)];
        }

        for ( var candidateIndex=0; candidateIndex < candidateCount; candidateIndex++) {
          var candidate = { key: candidateIndex, firstName: generateFirstName(), lastName: generateLastName()};
          candidates.push( candidate );
        }

        return candidates;
      }

      this.electedCandidatesArray = [];    
      this.candidatesArray = [];       

      angular.forEach( generatedCandidates(this.numberOfCandidates), ( function(thisCandidate) {
        this.candidatesArray.push(new Candidate(thisCandidate));
       }).bind(this)); 

      this.voteCount = votesCount; 
      this.seatsToFill = seatsToFillCount;

      // place votes
      this.runElection();
    };

    /**
    * @desc 
    * @return 
    */
    this.getCandidate = function( candidateKey) {

      var candidateWithKey = 0;
      angular.forEach(this.candidatesArray, ( function(thisCandidate) {
        if (thisCandidate.key === candidateKey) {
          candidateWithKey = thisCandidate;
        }
      }).bind(this)); 
      return candidateWithKey;
    };



    /**
    * @desc 
    * @return 
    */
    this.runElection  = function() {
     
      this.generateVotes();

      this.generateVoteMap();

      this.processVoteResolution(); 
    };

    /**
    * @desc 
    * @return 
    */
    this.generateVotes = function() {
      this.votesArray = [];

      for (var voterIndex = 0; voterIndex<this.voteCount; voterIndex++) {
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
    };

    /**
    * @desc 
    * @return 
    */
    this.generateVoteMap = function() {
      this.votePref = []; // index 0: vote pref; index 1: hash map of key of candidate; value: tally of votes for combination of vote pref and candidate.

      angular.forEach(this.candidatesArray, ( function() {
          this.votePref.push( {} );
        }).bind(this)); 
      
      angular.forEach(this.candidatesArray, ( function(thisCandidate) {
        for ( var votePreferenceIndex=0; votePreferenceIndex < this.candidatesArray.length; votePreferenceIndex++) {
          this.votePref[votePreferenceIndex][thisCandidate.key] = [];
        }
       }).bind(this)); 

      // build votePref mapping table from votes
      this.votesArray.forEach( function( thisVote) {
        thisVote.forEach( function( candidateKey, preferenceIndex) {
            this.votePref[ preferenceIndex][ candidateKey].push( thisVote);
        }.bind(this));
      }.bind(this));
    };

    /**
    * @desc 
    * @return 
    */
    this.processVoteResolution = function() {

      this.voteResolutionRounds = [];
      this.voteResolutionRounds.push( new VotingRound( this.votePref, this.candidatesArray, this.seatsToFill ) );

      var thisVotingRound = this.voteResolutionRounds[this.voteResolutionRounds.length-1];


      var roundIndex = 0; //safegaurd against infinite loop - can test removing this safeguard now that elected candiadtes votes are being transferred.
      while ( thisVotingRound !== null && roundIndex < 10) {

        var newVotingRound = thisVotingRound.process();

        // append elected candidate(s) from this round to store
        if ( thisVotingRound.electedCandidates.length > 0) {
          thisVotingRound.electedCandidates.forEach( function( electedCandidate) {
            this.electedCandidatesArray.push( electedCandidate);
          }.bind( this));
        }

        // have required number of candidates been elected?
        if ( this.electedCandidatesArray.length >= this.seatsToFill) {
          thisVotingRound = null; // specify no more voting rounds. 
        } else {
          // append new voting round.
          if ( newVotingRound !== null) {
            this.voteResolutionRounds.push(newVotingRound);
            thisVotingRound = this.voteResolutionRounds[this.voteResolutionRounds.length-1];
          } else {
            thisVotingRound = null;
          }
        }

        roundIndex ++; 
      }

    };

    // Call the initialize function for every new instance
    this.initialize();
  };

  /**
  * Return the constructor function.
  */
  return Election;
});