'use strict';

describe('Service: ElectionService', function () {

  // load the service's module
  beforeEach(module('stvApp'));

  // instantiate service
  var ElectionService;
  beforeEach(inject(function (_ElectionService_) {
    ElectionService = _ElectionService_;
  }));

  it('should do something', function () {
    expect(!!ElectionService).toBe(true);
  });

});
