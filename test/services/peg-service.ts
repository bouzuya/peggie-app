/// <reference path="../../typings/mocha/mocha.d.ts" />
/// <reference path="../../typings/power-assert/power-assert.d.ts" />
import assert = require('power-assert');

import PegService = require('../../app/scripts/services/peg-service');

describe('PegService', function() {
  beforeEach(function() {
    this.data1 = { peg: true, date: '2015-01-10', value: 1000 };
    this.data2 = { peg: true, date: '2015-01-05', value: 500 };
    this.data3 = { peg: true, date: '2015-01-05', value: 100 };
    this.service = new PegService();
  });

  describe('#toArray', function() {
    context('when empty', function() {
      it('returns []', function() {
        assert.deepEqual(this.service.toArray(), []);
      });
    });

    context('when [data1]', function() {
      beforeEach(function() {
        this.service.add(this.data1);
      });

      it('returns [data1]', function() {
        assert.deepEqual(this.service.toArray(), [this.data1]);
      });
    });

    context('when [data1, data2]', function() {
      beforeEach(function() {
        this.service.add(this.data1);
        this.service.add(this.data2);
      });

      it('returns [data1, data2]', function() {
        assert.deepEqual(this.service.toArray(), [this.data1, this.data2]);
      });
    });

    context('when [data1, data2, data3]', function() {
      beforeEach(function() {
        this.service.add(this.data1);
        this.service.add(this.data2);
        this.service.add(this.data3);
      });

      it('returns [data1, data3, data2]', function() {
        assert.deepEqual(this.service.toArray(), [
          this.data1, this.data3, this.data2]);
      });
    });
  });
});
