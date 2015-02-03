class PegService {
  private _items: Array<{ date: string }>;

  constructor() {
    this._items = [];
  }

  add(item: { date: string }): void {
    var index = this._items.filter((i) => i.date > item.date).length;
    this._items.splice(index, 0, item);
  }

  toArray(): Array<{ date: string }> {
    return this._items;
  }
}

export = PegService
