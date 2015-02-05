import Item = require('../models/item');

class PegService {
  private _items: Array<Item>;

  constructor() {
    this._items = [];
  }

  add(item: Item): void {
    var index = this._items.filter((i) => i.date < item.date).length;
    this._items.splice(index, 0, item);
  }

  remove(item: Item): void {
    var index = this._items.indexOf(item);
    if (index === -1) return;
    this._items.splice(index, 1);
  }

  getItems(item: Item): Array<Item> {
    return this._items.filter((i) => i.date >= item.date).reduce((r, i) => {
      if (r.date !== null && r.date > i.date) return r;
      if (i.peg) return { date: i.date, items: r.items };
      return { end: false, items: r.items.concat(i) };
    }, { date: null, items: [] }).items;
  }

  getPegs(): Array<Item> {
    return this._items.filter((i) => i.peg);
  }
}

export = PegService
