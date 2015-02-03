class Item {
  private _date: string;

  constructor(options: { date: string }) {
    this._date = options.date;
  }

  get date() {
    return this._date;
  }
}

export = Item;
