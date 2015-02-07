/// <reference path="../../../typings/angularjs/angular.d.ts" />

import PegFormService = require('../services/peg-form-service');
import PegStoreService = require('../services/peg-store-service');

class AppController {
  static $inject = [
    'PegFormService',
    'PegStoreService'
  ];

  pegFormService: PegFormService;
  pegStoreService: PegStoreService;
  pegs: Array<{}>;
  peg: { index: string; };

  constructor(
    pegFormService: PegFormService,
    pegStoreService: PegStoreService
  ) {
    this.pegFormService = pegFormService;
    this.pegStoreService = pegStoreService;
    this.pegs = pegStoreService.getAll();
  }

  formFor(index: number) {
    this.pegFormService.setIndex(index);
  }
}

export = AppController;
