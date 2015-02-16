/// <reference path="../../../typings/angularjs/angular.d.ts" />

import PegType = require('../models/peg-type');

class PgPeg implements ng.IDirective {
  templateUrl: string = '../../views/directives/pg-peg.html';
  scope: any = {
    model: '='
  };
  link = function(scope) {
    scope.PegType = PegType;
  };
}

export = PgPeg;
