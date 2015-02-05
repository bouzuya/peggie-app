class Item {
  private _date: string;
  private _peg: boolean;
  private _value: number;

  constructor(options: {
    date: string;
    peg: boolean;
    value: number;
  }) {
    this._date = options.date;
    this._peg = options.peg;
    this._value = options.value;
  }

  get date() {
    return this._date;
  }

  get peg() {
    return this._peg;
  }

  get value() {
    return this._value;
  }
}

export = Item;
