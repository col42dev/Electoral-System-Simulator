'use strict';

describe('Service: VotingRound', function () {

  // load the service's module
  beforeEach(module('stvApp'));

  // instantiate service
  var VotingRound;
  beforeEach(inject(function (_VotingRound_) {
    VotingRound = _VotingRound_;
  }));

  it('should do something', function () {
    expect(!!VotingRound).toBe(true);
  });

});
