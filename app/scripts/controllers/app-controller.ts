/// <reference path="../../../typings/angularjs/angular.d.ts" />

class AppController {
  static $inject = [];

  pegs: Array<{}>;

  constructor() {
    this.pegs = [
      { date: '2015-01-03', value: 3000 },
      { date: '2015-01-02', value: 2000 },
      { date: '2015-01-01', value: 1000 }
    ];
  }
}

export = AppController;
