/// <reference path="../../typings/mocha/mocha.d.ts" />
/// <reference path="../../typings/power-assert/power-assert.d.ts" />
import assert = require('power-assert');

import Item = require('../../app/scripts/models/item');

describe('Item', function() {
  describe('#constructor', function() {
    beforeEach(function() {
      this.date = '2015-01-01';
      this.peg = true;
      this.value = 1000;
      this.item = new Item({
        date: this.date,
        peg: this.peg,
        value: this.value
      });
    });

    it('works', function() {
      assert(this.item.date === this.date);
      assert(this.item.peg === this.peg);
      assert(this.item.value === this.value);
    });
  });
});
