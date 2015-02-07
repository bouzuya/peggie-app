/// <reference path="../../../typings/angularjs/angular.d.ts" />
/// <reference path="../../../typings/moment/moment.d.ts" />

import PegStoreService = require('../services/peg-store-service');

class PgPegFormController {
  static $inject = [
    'PegStoreService'
  ];

  peg: {
    peg: boolean;
    index: number;
    date: string;
    value: number;
  };

  pegStoreService: PegStoreService;

  constructor(
    pegStoreService: PegStoreService
  ) {
    this.pegStoreService = pegStoreService;
    this._reset();
  }

  click(): void {
    this.pegStoreService.insert(this.peg.index, this.peg);
    this._reset();
  }

  _reset(): void {
    this.peg = {
      peg: true,
      index: 0,
      date: moment().format('YYYY-MM-DD'),
      value: 0
    };
  }
}

class PgPegForm implements ng.IDirective {
  controller = PgPegFormController;
  controllerAs = 'c';
  scope: any = { model: '=' };
  templateUrl = '../../views/directives/pg-peg-form.html';
}

function PgPegFormFactory(): ng.IDirective {
  return new PgPegForm();
}

export = PgPegFormFactory;
