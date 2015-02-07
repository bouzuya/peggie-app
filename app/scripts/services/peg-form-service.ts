/// <reference path="../../../typings/angularjs/angular.d.ts" />

class PegFormService {
  static $inject = [
    '$rootScope'
  ];

  $rootScope: ng.IRootScopeService;

  constructor(
    $rootScope
  ) {
    this.$rootScope = $rootScope;
  }

  setIndex(index: number) {
    this.$rootScope.$emit('peg-form-service:set-index', index);
  }
}

export = PegFormService;
