'use strict';

/**
 * @ngdoc service
 * @name stvApp.Election
 * @description
 * # Election
 * Factory in the stvApp.
 */

angular.module('stvApp')
.factory('Election', function (Candidate, VotingRound) {


  /**
   * Constructor, with class name
   */
  var Election = function(candidateCount) {
    // Public properties, assigned to the instance ('this')



    this.initialize = function() {
      console.log('Factory create Election');


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

      this.candidatesArray = [];       

      angular.forEach( generatedCandidates(this.numberOfCandidates), ( function(thisCandidate) {
        this.candidatesArray.push(new Candidate(thisCandidate));
       }).bind(this)); 

      this.voteCount = 5; 
      this.seatsToFill = 1;
      this.droopQuota = 0;

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
    * @desc droop Quota - number of votes required by candidate to be elected.
    * @return integer value quota
    */
    this.getDroopQuota = function() {
      return Math.floor((this.votesArray.length / (this.seatsToFill + 1)) + 1);
    };

    /**
    * @desc - called on change of input param for the number of seats to fill.
    */
    this.onSeatsToFillChange = function() {
      this.runElection();
    };

    /**
    * @desc - called on change of input param for the number of votes.
    */
    this.onVoteCountChange = function() {
      this.runElection();
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
      this.voteResolutionRounds.push( new VotingRound( this.votePref, this.candidatesArray ) );

      var thisVotingRound = this.voteResolutionRounds[this.voteResolutionRounds.length-1];

      while ( true) {
        if ( thisVotingRound.isCandidateElected( this.getDroopQuota()) === false) {
            // eliminate the candidate(s) with least votes.
            thisVotingRound.eliminateCandidate();
        }

        console.log('>>>>>>>>NEXT ROUND');

        // create new round
        var newVotingRound = new VotingRound( thisVotingRound.votePref, thisVotingRound.candidatesArray );
        this.voteResolutionRounds.push(newVotingRound);

        thisVotingRound = this.voteResolutionRounds[this.voteResolutionRounds.length-1];

        // transfer any surplus votes to other candidates.

        break; // for now only handle up to one additonal round
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