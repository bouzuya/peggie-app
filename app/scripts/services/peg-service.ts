import Item = require('../models/item');

class PegService {
  private _items: Array<Item>;

  constructor() {
    this._items = [];
  }

  add(item: Item): void {
    var index = this._items.filter((i) => i.date > item.date).length;
    this._items.splice(index, 0, item);
  }

  remove(item: Item): void {
    var index = this._items.indexOf(item);
    if (index === -1) return;
    this._items.splice(index, 1);
  }

  toArray(): Array<Item> {
    return this._items;
  }
}

export = PegService
