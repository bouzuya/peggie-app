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

  toArray(): Array<Item> {
    return this._items;
  }
}

export = PegService
