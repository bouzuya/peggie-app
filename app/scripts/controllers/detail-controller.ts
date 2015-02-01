/// <reference path="../../../typings/angularjs/angular.d.ts" />
/// <reference path="../../../typings/angular-ui/angular-ui-router.d.ts" />

import HubotScriptService = require('../services/hubot-script-service');

class DetailController {
  static $inject = [
    '$stateParams',
    'HubotScriptService'
  ];

  script: {};

  constructor(
    $stateParams: ng.ui.IStateParamsService,
    HubotScriptService : HubotScriptService
  ) {
    var scriptId = parseInt($stateParams['scriptId'], 10);
    HubotScriptService.find(scriptId).then((script) => {
      this.script = script;
    });
  }
}

export = DetailController;
