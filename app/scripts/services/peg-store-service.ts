class PegStoreService {
  pegs: Array<{ date: string; peg: boolean; value: number }>;

  constructor() {
    this.pegs = [
      { peg: true, date: '2015-01-03', value: 3000, unknown: 5000 },
      { peg: false, date: '2015-01-02', value: 2000 },
      { peg: true, date: '2015-01-01', value: 10000, unknown: 0 }
    ];
  }

  insert(index: number, peg: { date: string; peg: boolean; value: string }): void {
    var sum = (array: Array<{ value: number }>): number => {
      return array.reduce(((r, i) => r + i.value), 0);
    };

    var value = parseInt(peg.value, 10);
    var before = this.pegs.slice(0, index);
    var beforeItems = this._takeRightWhile(before, (i) => !i.peg);
    var prevIndex = this._lastIndexOf(before, (i) => i.peg);
    var after = this.pegs.slice(index);
    var afterItems = this._takeWhile(after, (i) => !i.peg);
    var nextIndex = this._indexOf(after, (i) => i.peg);

    if (peg.peg) {
      if (prevIndex >= 0) {
        var prev = this.pegs[prevIndex];
        var prevItems = beforeItems;
        var prevUnknown = value - sum(prevItems) - prev.value;
        this.pegs.splice(prevIndex, 1, {
          peg: prev.peg,
          date: prev.date,
          unknown: prevUnknown,
          value: prev.value
        });
      }
      var nextValue = nextIndex >= 0 ? after[nextIndex].value : 0;
      var unknown = nextIndex >= 0 ? nextValue - sum(afterItems) - value : 0;
      this.pegs.splice(index, 0, {
        peg: peg.peg,
        date: peg.date,
        unknown: unknown,
        value: value
      });
    } else {
      if (prevIndex >= 0) {
        var prev = this.pegs[prevIndex];
        var prevItems = beforeItems.concat(afterItems);
        var nextValue = nextIndex >= 0 ? after[nextIndex].value : 0;
        var prevUnknown = nextValue - sum(prevItems) - value - prev.value;
        this.pegs.splice(prevIndex, 1, {
          peg: prev.peg,
          date: prev.date,
          unknown: prevUnknown,
          value: prev.value
        });
      }
      var unknown: number = null;
      this.pegs.splice(index, 0, {
        date: peg.date,
        peg: peg.peg,
        unknown: unknown,
        value: value
      });
    }
  }

  getAll(): Array<{}> {
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
