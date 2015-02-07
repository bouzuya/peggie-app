/// <reference path="../../../typings/angularjs/angular.d.ts" />
/// <reference path="../../../typings/moment/moment.d.ts" />

import Peg = require('../models/peg');
import PegStoreService = require('../services/peg-store-service');

class AppController {
  static $inject = [
    'PegStoreService'
  ];

  peg: Peg;
  pegIndex: number;
  pegStoreService: PegStoreService;
  pegs: Array<Peg>;

  constructor(
    pegStoreService: PegStoreService
  ) {
    this._reset();
    this.pegStoreService = pegStoreService;
    this.pegs = pegStoreService.getAll();
  }

  formFor(index: number, peg: boolean) {
    this.pegIndex = index;
    this.peg.peg = peg;
    var item = this.pegs[index - 1];
    this.peg.date = item ? item.date : moment().format('YYYY-MM-DD');
  }

  clear(): void {
    this._reset();
  }

  click(): void {
    this.pegStoreService.insert(this.pegIndex, this.peg);
    this._reset();
  }

  _reset(): void {
    this.pegIndex = -1;
    this.peg = {
      date: moment().format('YYYY-MM-DD'),
      note: null,
      peg: true,
      value: 0
    };
  }
}

export = AppController;
