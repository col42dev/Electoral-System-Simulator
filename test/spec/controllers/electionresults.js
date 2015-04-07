'use strict';

describe('Controller: ElectionresultsCtrl', function () {

  // load the controller's module
  beforeEach(module('stvApp'));

  var ElectionresultsCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    ElectionresultsCtrl = $controller('ElectionresultsCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
