/// <reference path="../../typings/mocha/mocha.d.ts" />
/// <reference path="../../typings/power-assert/power-assert.d.ts" />
import assert = require('power-assert');

import PegService = require('../../app/scripts/services/peg-service');

describe('PegService', function() {
  beforeEach(function() {
    this.service = new PegService();
  });

  describe('#toArray', function() {
    context('when empty', function() {
      it('returns []', function() {
        assert.deepEqual(this.service.toArray(), []);
      });
    });
  });
});
