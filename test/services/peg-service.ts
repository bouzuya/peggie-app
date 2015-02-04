/// <reference path="../../typings/mocha/mocha.d.ts" />
/// <reference path="../../typings/power-assert/power-assert.d.ts" />
import assert = require('power-assert');

import PegService = require('../../app/scripts/services/peg-service');

describe('PegService', function() {
  beforeEach(function() {
    this.p1 = { peg: true, date: '2015-01-10', value: 1000 };
    this.p2 = { peg: true, date: '2015-01-05', value: 500 };
    this.p3 = { peg: true, date: '2015-01-05', value: 100 };
    this.p4 = { peg: true, date: '2015-01-02', value: 250 };
    this.i5 = { peg: false, date: '2015-01-07', value: 200 };
    this.i6 = { peg: false, date: '2015-01-03', value: 110 };
    this.service = new PegService();
  });

  describe('#remove', function() {
    beforeEach(function() {
      this.service.add(this.p1);
      this.service.add(this.p2);
      this.service.add(this.p3);
    });

    context('when item exists', function() {
      beforeEach(function() {
        this.length = this.service.getPegs().length;
        this.service.remove(this.p1);
      });

      it('works', function() {
        assert(this.service.getPegs().length === this.length - 1);
        assert(this.service.getPegs().indexOf(this.p1) === -1);
      });
    });

    context('when item does not exist', function() {
      beforeEach(function() {
        this.length = this.service.getPegs().length;
        this.service.remove(this.p4);
      });

      it('does nothing', function() {
        assert(this.service.getPegs().length === this.length);
      });
    });
  });

  describe('#getItems', function() {
    context('when [p1]', function() {
      beforeEach(function() {
        this.service.add(this.p1);
      });

      context('with p1', function() {
        beforeEach(function() {
          this.item = this.p1;
        });

        it('returns []', function() {
          assert.deepEqual(this.service.getItems(this.item), []);
        });
      });
    });

    context('when [p1, i5]', function() {
      beforeEach(function() {
        this.service.add(this.p1);
        this.service.add(this.i5);
      });

      context('with p1', function() {
        beforeEach(function() {
          this.item = this.p1;
        });

        it('returns [i5]', function() {
          assert.deepEqual(this.service.getItems(this.item), [this.i5]);
        });
      });
    });

    context('when [p1, i5, i5]', function() {
      beforeEach(function() {
        this.service.add(this.p1);
        this.service.add(this.i5);
        this.service.add(this.i5);
      });

      context('with p1', function() {
        beforeEach(function() {
          this.item = this.p1;
        });

        it('returns [i5, i5]', function() {
          assert.deepEqual(this.service.getItems(this.item), [
            this.i5, this.i5
          ]);
        });
      });
    });

    context('when [p1, i5, p2, i6]', function() {
      beforeEach(function() {
        this.service.add(this.p1);
        this.service.add(this.i5);
        this.service.add(this.p2);
        this.service.add(this.i6);
      });

      context('with p1', function() {
        beforeEach(function() { this.item = this.p1; });

        it('returns [i5]', function() {
          assert.deepEqual(this.service.getItems(this.item), [this.i5]);
        });
      });

      context('with p2', function() {
        beforeEach(function() { this.item = this.p2; });

        it('returns [i6]', function() {
          assert.deepEqual(this.service.getItems(this.item), [this.i6]);
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

    context('when [p1]', function() {
      beforeEach(function() {
        this.service.add(this.p1);
      });

      it('returns [p1]', function() {
        assert.deepEqual(this.service.getPegs(), [this.p1]);
      });
    });

    context('when [p1, p2]', function() {
      beforeEach(function() {
        this.service.add(this.p1);
        this.service.add(this.p2);
      });

      it('returns [p1, p2]', function() {
        assert.deepEqual(this.service.getPegs(), [this.p1, this.p2]);
      });
    });

    context('when [p1, p2, p3]', function() {
      beforeEach(function() {
        this.service.add(this.p1);
        this.service.add(this.p2);
        this.service.add(this.p3);
      });

      it('returns [p1, p3, p2]', function() {
        assert.deepEqual(this.service.getPegs(), [
          this.p1, this.p3, this.p2
        ]);
      });
    });
  });
});
