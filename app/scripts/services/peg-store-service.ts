class PegStoreService {
  pegs: Array<{}>;

  constructor() {
    this.pegs = [
      { date: '2015-01-03', value: 3000 },
      { date: '2015-01-02', value: 2000 },
      { date: '2015-01-01', value: 1000 }
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
