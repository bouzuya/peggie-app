/// <reference path="../../typings/mocha/mocha.d.ts" />
/// <reference path="../../typings/power-assert/power-assert.d.ts" />
import assert = require('power-assert');

import PegStoreService = require('../../app/scripts/services/peg-store-service');

describe('PegStoreService', function() {
  beforeEach(function() {
    this.service = new PegStoreService();
  });

  describe('#insert', function() {
    beforeEach(function() {
      // clear dummy data
      this.service.pegs = [];
      this.peg1 = {
        date: '2015-01-01',
        note: 'peg1',
        peg: true,
        value: 10000
      };
      this.peg2 = {
        date: '2015-01-02',
        note: 'peg2',
        peg: true,
        value: 3000
      };
      this.peg3 = {
        date: '2015-01-02',
        note: 'peg3',
        peg: true,
        unknown: -3000,
        value: 4000
      };
      this.item1 = {
        date: '2015-01-01',
        note: 'item1',
        peg: false,
        value: -1000
      };
    });

    context('when []', function() {
      context('with 0, peg1', function() {
        beforeEach(function() { this.service.insert(0, this.peg1); });

        it('returns [peg1]', function() {
          assert.deepEqual(this.service.getAll(), [
            {
              date: '2015-01-01',
              note: 'peg1',
              peg: true,
              unknown: 0, // is 0
              value: 10000
            }
          ]);
        });
      });

      context('with 0, item1', function() {
        beforeEach(function() { this.service.insert(0, this.item1); });

        it('returns [item1]', function() {
          assert.deepEqual(this.service.getAll(), [
            {
              date: '2015-01-01',
              note: 'item1',
              peg: false,
              unknown: null,
              value: -1000
            }
          ]);
        });
      });

      context('with 1, peg1', function() {
        beforeEach(function() { this.service.insert(1, this.peg1); });

        it('returns []. ignore peg1 (invalid index)', function() {
          assert.deepEqual(this.service.getAll(), []);
        });
      });

      context('with -1, peg1', function() {
        beforeEach(function() { this.service.insert(-1, this.peg1); });

        it('returns []. ignore peg1 (invalid index)', function() {
          assert.deepEqual(this.service.getAll(), []);
        });
      });
    });

    context('when [peg1]', function() {
      beforeEach(function() {
        this.service.insert(0, this.peg1);
      });

      context('with 0, peg2', function() {
        beforeEach(function() { this.service.insert(0, this.peg2); });

        it('returns [peg2, peg1]', function() {
          assert.deepEqual(this.service.getAll(), [
            {
              date: '2015-01-02',
              note: 'peg2',
              peg: true,
              unknown: -7000,
              value: 3000
            },
            {
              date: '2015-01-01',
              note: 'peg1',
              peg: true,
              unknown: 0,
              value: 10000
            }
          ]);
        });
      });

      context('with 1, peg2', function() {
        beforeEach(function() { this.service.insert(1, this.peg2); });

        it('returns [peg1]. ignore peg2 (invalid date)', function() {
          assert.deepEqual(this.service.getAll(), [
            {
              date: '2015-01-01',
              note: 'peg1',
              peg: true,
              unknown: 0,
              value: 10000
            }
          ]);
        });
      });
    });

    context('when [peg2, peg1]', function() {
      beforeEach(function() {
        this.service.insert(0, this.peg1);
        this.service.insert(0, this.peg2);
      });

      context('with 0, item1', function() {
        beforeEach(function() { this.service.insert(0, this.item1); });

        it('returns [peg2, peg1]. ignore item1 (invalid date)', function() {
          assert.deepEqual(this.service.getAll(), [
            {
              date: '2015-01-02',
              note: 'peg2',
              peg: true,
              unknown: -7000,
              value: 3000
            },
            {
              date: '2015-01-01',
              note: 'peg1',
              peg: true,
              unknown: 0,
              value: 10000
            }
          ]);
        });
      });

      context('with 1, item1', function() {
        beforeEach(function() { this.service.insert(1, this.item1); });

        it('returns [peg2, item1, peg1]', function() {
          assert.deepEqual(this.service.getAll(), [
            {
              date: '2015-01-02',
              note: 'peg2',
              peg: true,
              unknown: -6000,
              value: 3000
            },
            {
              date: '2015-01-01',
              note: 'item1',
              peg: false,
              unknown: null,
              value: -1000
            },
            {
              date: '2015-01-01',
              note: 'peg1',
              peg: true,
              unknown: 0,
              value: 10000
            }
          ]);
        });
      });
    });

    context('when [peg2, item1, peg1]', function() {
      beforeEach(function() {
        this.service.insert(0, this.peg1);
        this.service.insert(0, this.item1);
        this.service.insert(0, this.peg2);
      });

      context('with 1, peg3', function() {
        beforeEach(function() { this.service.insert(1, this.peg3); });

        it('returns [peg2, peg3, item1, peg1]', function() {
          assert.deepEqual(this.service.getAll(), [
            {
              date: '2015-01-02',
              note: 'peg2',
              peg: true,
              unknown: -1000,
              value: 3000
            },
            {
              date: '2015-01-02',
              note: 'peg3',
              peg: true,
              unknown: -5000,
              value: 4000
            },
            {
              date: '2015-01-01',
              note: 'item1',
              peg: false,
              unknown: null,
              value: -1000
            },
            {
              date: '2015-01-01',
              note: 'peg1',
              peg: true,
              unknown: 0,
              value: 10000
            }
          ]);
        });
      });

      context('with 1, item1', function() {
        beforeEach(function() { this.service.insert(1, this.item1); });

        it('returns [peg2, item1, peg1]', function() {
          assert.deepEqual(this.service.getAll(), [
            {
              date: '2015-01-02',
              note: 'peg2',
              peg: true,
              unknown: -5000,
              value: 3000
            },
            {
              date: '2015-01-01',
              note: 'item1',
              peg: false,
              unknown: null,
              value: -1000
            },
            {
              date: '2015-01-01',
              note: 'item1',
              peg: false,
              unknown: null,
              value: -1000
            },
            {
              date: '2015-01-01',
              note: 'peg1',
              peg: true,
              unknown: 0,
              value: 10000
            }
          ]);
        });
      });
    });
  });
});
