class PegStoreService {
  pegs: Array<{}>;

  constructor() {
    this.pegs = [
      { peg: true, date: '2015-01-03', value: 3000, unknown: 5000 },
      { peg: false, date: '2015-01-02', value: 2000 },
      { peg: true, date: '2015-01-01', value: 10000, unknown: 0 }
    ];
  }

  insert(index: number, peg: {}) {
    this.pegs.splice(index, 0, peg);
  }

  getAll(): Array<{}> {
    return this.pegs;
  }
}

export = PegStoreService;
