/* jshint -W117, -W030 */
describe('Drexler Storage', function(){
  'use strict';

  beforeEach(function(){
    module('drexler.blocks.storage'),
    specHelper.injector(function($rootScope, drexlerStorage) {});
  });

  it('should validate a dummy assertion', function(){
    assert.equal(true, true);
  });

  it('should contain a drexlerStorage service', function(){
    expect(drexlerStorage).not.to.equal(null);
  });

});
