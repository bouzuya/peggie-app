class PegService {
  private _items: Array<{}>;

  constructor() {
    this._items = [];
  }

  add(item: {}): void {
    this._items.push(item);
  }

  toArray(): Array<{}> {
    return this._items;
  }
}

export = PegService
