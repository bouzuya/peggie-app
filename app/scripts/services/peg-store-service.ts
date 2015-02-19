/// <reference path="../../../typings/moment/moment.d.ts" />

import Peg = require('../models/peg');
import PegType = require('../models/peg-type');

class PegStoreService {
  pegs: Array<Peg>;

  constructor() {
    this.pegs = [];
    [
      { type: PegType.Item, date: '2015-01-09', value: -750, note: 'カレー' },
      { type: PegType.Item, date: '2015-01-07', value: -800, note: 'きつねうどんていしょく' },
      { type: PegType.Item, date: '2015-01-06', value: -700, note: 'ぎょうざていしょく' },
      { type: PegType.Peg, date: '2015-01-05', value: 3500, unknown: -5100, note: null },
      { type: PegType.Item, date: '2015-01-03', value: 100, note: '交差点でひろった' },
      { type: PegType.Item, date: '2015-01-02', value: -1500, note: 'はつもうで' },
      { type: PegType.Peg, date: '2015-01-01', value: 10000, unknown: 0, note: 'おとしだま直後' }
    ].forEach((i) => {
      this.insert(this._indexFor(i), i);
    });
  }

  insert(index: number, peg: Peg): void {
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

    if (peg.type === PegType.Peg) {
      this._insertPeg(index, peg);
    } else {
      this._insertItem(index, peg);
    }
  }

  remove(index: number): void {
    var sum = (array: Array<{ value: number }>): number => {
      return array.reduce(((r, i) => r + i.value), 0);
    };

    if (index < 0 || this.pegs.length < index) return;

    var before = this.pegs.slice(0, index);
    var beforeItems = this._takeRightWhile(before, (i) => !(i.type === PegType.Peg));
    var prevIndex = this._lastIndexOf(before, (i) => i.type === PegType.Peg);
    var after = this.pegs.slice(index);
    var afterItems = this._takeWhile(after, (i) => !(i.type === PegType.Peg));
    var nextIndex = index + this._indexOf(after, (i) => i.type === PegType.Peg);

    var peg = this.pegs[index];
    if (prevIndex >= 0) {
      var prev = this.pegs[prevIndex];
      var prevItems = beforeItems.concat(afterItems);
      var nextValue = nextIndex >= 0 ? this.pegs[nextIndex].value : 0;
      var prevUnknown = prev.value - nextValue - sum(prevItems) + peg.value;
      this.pegs.splice(prevIndex, 1, {
        date: prev.date,
        note: prev.note,
        type: prev.type,
        unknown: prevUnknown,
        value: prev.value
      });
    }
    this.pegs.splice(index, 1);
  }

  getAll(): Array<Peg> {
    return this.pegs;
  }

  private _indexFor(peg: Peg): number {
    return this.pegs.filter((i) => i.date > peg.date).length;
  }

  private _insertPeg(index: number, peg: Peg) {
    var prev = this._prevPeg(index);
    var next = this._nextPeg(index);

    if (prev.peg !== null) {
      var prevUnknown = prev.peg.value + prev.itemsValue - peg.value;
      this.pegs.splice(prev.index, 1, {
        date: prev.peg.date,
        note: prev.peg.note,
        type: prev.peg.type,
        unknown: prevUnknown,
        value: prev.peg.value
      });
    }
    var nextValue = next.peg !== null ? next.peg.value : 0;
    var unknown = next.peg !== null ? peg.value - nextValue - next.itemsValue : 0;
    this.pegs.splice(index, 0, {
      date: peg.date,
      note: peg.note,
      type: peg.type,
      unknown: unknown,
      value: peg.value
    });
  }

  private _insertItem(index: number, peg: Peg) {
    var prev = this._prevPeg(index);
    var next = this._nextPeg(index);

    if (prev.peg !== null) {
      var nextValue = next.index >= 0 ? next.peg.value : 0;
      var prevUnknown = prev.peg.value - prev.itemsValue - next.itemsValue - nextValue - peg.value;
      this.pegs.splice(prev.index, 1, {
        date: prev.peg.date,
        note: prev.peg.note,
        type: prev.peg.type,
        unknown: prevUnknown,
        value: prev.peg.value
      });
    }
    var unknown: number = null;
    this.pegs.splice(index, 0, {
      date: peg.date,
      note: peg.note,
      type: peg.type,
      unknown: unknown,
      value: peg.value
    });
  }

  private _nextPeg(index: number): { index: number; items: Array<Peg>; itemsValue: number; peg: Peg } {
    var items = this.pegs;
    var after = items.slice(index);
    var index = index + this._indexOf(after, (i) => i.type === PegType.Peg);
    var afterItems = this._takeWhile(after, (i) => !(i.type === PegType.Peg));
    var value = this._sumValue(afterItems);
    if (index < 0) return { index: null, items: afterItems, itemsValue: value, peg: null };
    return { index: index, items: afterItems, itemsValue: value, peg: items[index] };
  }

  private _prevPeg(index: number): { index: number; items: Array<Peg>; itemsValue: number; peg: Peg } {
    var items = this.pegs;
    var before = items.slice(0, index);
    var index = this._lastIndexOf(before, (i) => i.type === PegType.Peg);
    var beforeItems = this._takeRightWhile(before, (i) => !(i.type === PegType.Peg));
    var value = this._sumValue(beforeItems);
    if (index < 0) return { index: null, items: beforeItems, itemsValue: value, peg: null };
    return { index: index, items: beforeItems, itemsValue: value, peg: items[index] };
  }

  private _sumValue(array: Array<{ value: number }>): number {
    return array.reduce(((r, i) => r + i.value), 0);
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
