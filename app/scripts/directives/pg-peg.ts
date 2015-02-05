/// <reference path="../../../typings/angularjs/angular.d.ts" />

class PgPeg implements ng.IDirective {
  templateUrl: string = '../../views/directives/pg-peg.html';
  scope: any = {
    model: '='
  };
}

export = PgPeg;
