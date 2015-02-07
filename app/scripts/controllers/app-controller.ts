/// <reference path="../../../typings/angularjs/angular.d.ts" />
/// <reference path="../../../typings/moment/moment.d.ts" />

import PegStoreService = require('../services/peg-store-service');

class AppController {
  static $inject = [
    'PegStoreService'
  ];

  peg: {
    date: string;
    index: number;
    note: string;
    peg: boolean;
    value: number;
  };

  pegStoreService: PegStoreService;
  pegs: Array<{ date: string }>;

  constructor(
    pegStoreService: PegStoreService
  ) {
    this._reset();
    this.pegStoreService = pegStoreService;
    this.pegs = pegStoreService.getAll();
  }

  formFor(index: number, peg: boolean) {
    this.peg.index = index;
    this.peg.peg = peg;
    var item = this.pegs[index - 1];
    this.peg.date = item ? item.date : moment().format('YYYY-MM-DD');
  }

  clear(): void {
    this._reset();
  }

  click(): void {
    this.pegStoreService.insert(this.peg.index, this.peg);
    this._reset();
  }

  _reset(): void {
    this.peg = {
      date: moment().format('YYYY-MM-DD'),
      index: 0,
      note: null,
      peg: true,
      value: 0
    };
  }
}

export = AppController;
