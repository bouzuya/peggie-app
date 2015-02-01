/// <reference path="../../../typings/angularjs/angular.d.ts" />

import HubotScriptService = require('../services/hubot-script-service');

class AppController {
  static $inject = [
    '$scope',
    'HubotScriptService'
  ];

  limit: number;
  loaded: boolean;
  query: string;
  scripts: Array<{}>;

  constructor(
    $scope : ng.IScope,
    HubotScriptService : HubotScriptService
  ) {
    this.limit = 10;
    this.loaded = false;
    this.scripts = [];

    HubotScriptService.findAll().then((scripts) => {
      this.loaded = true;
      this.scripts = scripts;
    });
  }

  more(): void {
    var count = Math.min(this.limit + 10, this.scripts.length);
    this.limit = count;
  }
}

export = AppController;
