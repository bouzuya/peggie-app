/// <reference path="../../typings/mocha/mocha.d.ts" />
/// <reference path="../../typings/power-assert/power-assert.d.ts" />
import assert = require('power-assert');

import PegService = require('../../app/scripts/services/peg-service');

describe('PegService', function() {
  beforeEach(function() {
    this.data1 = { peg: true, date: '2015-01-10', value: 1000 };
    this.data2 = { peg: true, date: '2015-01-05', value: 500 };
    this.data3 = { peg: true, date: '2015-01-05', value: 100 };
    this.data4 = { peg: true, date: '2015-01-02', value: 250 };
    this.data5 = { peg: false, date: '2015-01-07', value: 200 };
    this.data6 = { peg: false, date: '2015-01-03', value: 110 };
    this.service = new PegService();
  });

  describe('#remove', function() {
    beforeEach(function() {
      this.service.add(this.data1);
      this.service.add(this.data2);
      this.service.add(this.data3);
    });

    context('when item exists', function() {
      beforeEach(function() {
        this.length = this.service.getPegs().length;
        this.service.remove(this.data1);
      });

      it('works', function() {
        assert(this.service.getPegs().length === this.length - 1);
        assert(this.service.getPegs().indexOf(this.data1) === -1);
      });
    });

    context('when item does not exist', function() {
      beforeEach(function() {
        this.length = this.service.getPegs().length;
        this.service.remove(this.data4);
      });

      it('does nothing', function() {
        assert(this.service.getPegs().length === this.length);
      });
    });
  });

  describe('#getItems', function() {
    context('when [data1]', function() {
      beforeEach(function() {
        this.service.add(this.data1);
      });

      context('with data1', function() {
        beforeEach(function() {
          this.item = this.data1;
        });

        it('returns []', function() {
          assert.deepEqual(this.service.getItems(this.item), []);
        });
      });
    });

    context('when [data1, data5]', function() {
      beforeEach(function() {
        this.service.add(this.data1);
        this.service.add(this.data5);
      });

      context('with data1', function() {
        beforeEach(function() {
          this.item = this.data1;
        });

        it('returns [data5]', function() {
          assert.deepEqual(this.service.getItems(this.item), [this.data5]);
        });
      });
    });

    context('when [data1, data5, data5]', function() {
      beforeEach(function() {
        this.service.add(this.data1);
        this.service.add(this.data5);
        this.service.add(this.data5);
      });

      context('with data1', function() {
        beforeEach(function() {
          this.item = this.data1;
        });

        it('returns [data5, data5]', function() {
          assert.deepEqual(this.service.getItems(this.item), [
            this.data5, this.data5
          ]);
        });
      });
    });

    context('when [data1, data5, data2, data6]', function() {
      beforeEach(function() {
        this.service.add(this.data1);
        this.service.add(this.data5);
        this.service.add(this.data2);
        this.service.add(this.data6);
      });

      context('with data1', function() {
        beforeEach(function() { this.item = this.data1; });

        it('returns [data5]', function() {
          assert.deepEqual(this.service.getItems(this.item), [this.data5]);
        });
      });

      context('with data2', function() {
        beforeEach(function() { this.item = this.data2; });

        it('returns [data6]', function() {
          assert.deepEqual(this.service.getItems(this.item), [this.data6]);
        });
      });
    });
  });

  describe('#getPegs', function() {
    context('when empty', function() {
      it('returns []', function() {
        assert.deepEqual(this.service.getPegs(), []);
      });
    });

    context('when [data1]', function() {
      beforeEach(function() {
        this.service.add(this.data1);
      });

      it('returns [data1]', function() {
        assert.deepEqual(this.service.getPegs(), [this.data1]);
      });
    });

    context('when [data1, data2]', function() {
      beforeEach(function() {
        this.service.add(this.data1);
        this.service.add(this.data2);
      });

      it('returns [data1, data2]', function() {
        assert.deepEqual(this.service.getPegs(), [this.data1, this.data2]);
      });
    });

    context('when [data1, data2, data3]', function() {
      beforeEach(function() {
        this.service.add(this.data1);
        this.service.add(this.data2);
        this.service.add(this.data3);
      });

      it('returns [data1, data3, data2]', function() {
        assert.deepEqual(this.service.getPegs(), [
          this.data1, this.data3, this.data2]);
      });
    });
  });
});
