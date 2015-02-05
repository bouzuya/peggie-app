/// <reference path="../../../typings/moment/moment.d.ts" />
/// <reference path="../../../typings/angularjs/angular.d.ts" />

import PegStoreService = require('../services/peg-store-service');

class AppController {
  static $inject = [
    'PegStoreService'
  ];

  pegStoreService: PegStoreService;
  pegs: Array<{}>;
  peg: { index: string; };

  constructor(
    pegStoreService: PegStoreService
  ) {
    this.pegStoreService = pegStoreService;
    this.pegs = pegStoreService.getAll();
    this._resetPeg();
  }

  add(): void {
    var index = parseInt(this.peg.index, 10);
    this.pegStoreService.insert(index, this.peg);
    this._resetPeg();
  }

  _resetPeg(): void {
    this.peg = { index: '0', date: moment().format('YYYY-MM-DD'), value: '0' };
  }
}

export = AppController;
