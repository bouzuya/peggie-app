/// <reference path="../../../typings/moment/moment.d.ts" />
/// <reference path="../../../typings/angularjs/angular.d.ts" />

class AppController {
  static $inject = [];

  pegs: Array<{}>;
  peg: { index: string; };

  constructor() {
    this.pegs = [
      { date: '2015-01-03', value: 3000 },
      { date: '2015-01-02', value: 2000 },
      { date: '2015-01-01', value: 1000 }
    ];
    this._resetPeg();
  }

  add(): void {
    var index = parseInt(this.peg.index, 10);
    this.pegs.splice(index, 0, this.peg);
    this._resetPeg();
  }

  _resetPeg(): void {
    this.peg = { index: '0', date: moment().format('YYYY-MM-DD'), value: '0' };
  }
}

export = AppController;
