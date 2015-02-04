class Item {
  private _date: string;
  private _peg: boolean;

  constructor(options: { date: string; peg: boolean }) {
    this._date = options.date;
    this._peg = options.peg;
  }

  get date() {
    return this._date;
  }

  get peg() {
    return this._peg;
  }
}

export = Item;
