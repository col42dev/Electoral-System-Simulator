'use strict';

/**
 * @ngdoc service
 * @name stvApp.Vote
 * @description
 * # Vote
 * Factory in the stvApp.
 */
angular.module('stvApp')
  .factory('Vote', function () {


    var Vote = function() {
        // Public properties, assigned to the instance ('this')

        this.initialize = function() {
          console.log('Vote Factory init Vote');
        };

        // Call the initialize function for every new instance
        this.initialize();
    };


    // Public API here
    return Vote;

  });
