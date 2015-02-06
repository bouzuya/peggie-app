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
  }
}

export = AppController;
