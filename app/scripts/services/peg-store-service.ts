/// <reference path="../../../typings/moment/moment.d.ts" />

import Peg = require('../models/peg');

class PegStoreService {
  pegs: Array<Peg>;

  constructor() {
    this.pegs = [
      { peg: false, date: '2015-01-09', value: 750, note: 'カレー' },
      { peg: false, date: '2015-01-07', value: 800, note: 'きつねうどんていしょく' },
      { peg: false, date: '2015-01-06', value: 700, note: 'ぎょうざていしょく' },
      { peg: true, date: '2015-01-05', value: 3500, unknown: 5000, note: null },
      { peg: false, date: '2015-01-02', value: 1500, note: 'はつもうで' },
      { peg: true, date: '2015-01-01', value: 10000, unknown: 0, note: 'おとしだま直後' }
    ];
  }

  insert(index: number, peg: Peg): void {
    var sum = (array: Array<{ value: number }>): number => {
      return array.reduce(((r, i) => r + i.value), 0);
    };

    if (index < 0 || this.pegs.length < index) return;

    var date = moment(peg.date);
    var dateIsValid = (
      index === 0 ||
      date.isSame(this.pegs[index - 1].date, 'days') ||
      date.isBefore(this.pegs[index - 1].date, 'days')
    ) && (
      index === this.pegs.length ||
      date.isSame(this.pegs[index].date, 'days') ||
      date.isAfter(this.pegs[index].date, 'days')
    );
    if (!dateIsValid) return;

    var before = this.pegs.slice(0, index);
    var beforeItems = this._takeRightWhile(before, (i) => !i.peg);
    var prevIndex = this._lastIndexOf(before, (i) => i.peg);
    var after = this.pegs.slice(index);
    var afterItems = this._takeWhile(after, (i) => !i.peg);
    var nextIndex = index + this._indexOf(after, (i) => i.peg);

    if (peg.peg) {
      if (prevIndex >= 0) {
        var prev = this.pegs[prevIndex];
        var prevItems = beforeItems;
        var prevUnknown = peg.value - sum(prevItems) - prev.value;
        this.pegs.splice(prevIndex, 1, {
          date: prev.date,
          note: prev.note,
          peg: prev.peg,
          unknown: prevUnknown,
          value: prev.value
        });
      }
      var nextValue = nextIndex >= 0 ? this.pegs[nextIndex].value : 0;
      var unknown = nextIndex >= 0 ? nextValue - sum(afterItems) - peg.value : 0;
      this.pegs.splice(index, 0, {
        date: peg.date,
        note: peg.note,
        peg: peg.peg,
        unknown: unknown,
        value: peg.value
      });
    } else {
      if (prevIndex >= 0) {
        var prev = this.pegs[prevIndex];
        var prevItems = beforeItems.concat(afterItems);
        var nextValue = nextIndex >= 0 ? this.pegs[nextIndex].value : 0;
        var prevUnknown = nextValue - sum(prevItems) - peg.value - prev.value;
        this.pegs.splice(prevIndex, 1, {
          date: prev.date,
          note: prev.note,
          peg: prev.peg,
          unknown: prevUnknown,
          value: prev.value
        });
      }
      var unknown: number = null;
      this.pegs.splice(index, 0, {
        date: peg.date,
        note: peg.note,
        peg: peg.peg,
        unknown: unknown,
        value: peg.value
      });
    }
  }

  getAll(): Array<Peg> {
    return this.pegs;
  }

  private _indexOf<T>(array: Array<T>, pred: (item: T) => boolean): number {
    var initial: { end: boolean; index: number } = { end: false, index: -1 };
    return array.reduce((r, i, index) => {
      if (r.end || !pred(i)) return r;
      return { end: true, index: index };
    }, initial).index;
  }

  private _lastIndexOf<T>(array: Array<T>, pred: (item: T) => boolean): number {
    var initial: { end: boolean; index: number } = { end: false, index: -1 };
    return array.reduceRight((r, i, index) => {
      if (r.end || !pred(i)) return r;
      return { end: true, index: index };
    }, initial).index;
  }

  private _takeRightWhile<T>(array: Array<T>, pred: (item: T) => boolean) {
    var initial: { end: boolean; items: Array<T> } = { end: false, items: [] };
    return array.reduceRight((r, i) => {
      if (r.end) return r;
      if (!pred(i)) return { end: true, items: r.items };
      return { end: false, items: r.items.concat(i) };
    }, initial).items;
  }

  private _takeWhile<T>(array: Array<T>, pred: (item: T) => boolean) {
    var initial: { end: boolean; items: Array<T> } = { end: false, items: [] };
    return array.reduce((r, i) => {
      if (r.end) return r;
      if (!pred(i)) return { end: true, items: r.items };
      return { end: false, items: r.items.concat(i) };
    }, initial).items;
  }
}

export = PegStoreService;
