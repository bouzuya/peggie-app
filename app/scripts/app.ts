/// <reference path="../../typings/angularjs/angular.d.ts" />

import AppController = require('./controllers/app-controller');
import DetailController = require('./controllers/detail-controller');
import HubotScriptService = require('./services/hubot-script-service');
import PegFormService = require('./services/peg-form-service');
import PegStoreService = require('./services/peg-store-service');
import PgPeg = require('./directives/pg-peg');
import PgPegFormFactory = require('./directives/pg-peg-form');

angular
.module('app', [
  'ui.router'
])
.service('HubotScriptService', HubotScriptService)
.service('PegFormService', PegFormService)
.service('PegStoreService', PegStoreService)
.directive('pgPeg', () => new PgPeg())
.directive('pgPegForm', PgPegFormFactory)
.controller('AppController', AppController)
.controller('DetailController', DetailController)
.config([
  '$locationProvider',
  '$stateProvider',
  '$urlRouterProvider',
  (
    $locationProvider,
    $stateProvider,
    $urlRouterProvider
  ) => {
    /*$locationProvider.html5Mode(true);*/

    $urlRouterProvider.otherwise('/');

    $stateProvider
    .state('scripts', {
      url: '/',
      views: {
        'list-view': {
          templateUrl: 'views/scripts/list.html'
        }
      }
    })
    .state('scripts.detail', {
      url: '{scriptId:[0-9]{1,3}}',
      views: {
        'detail-view@': {
          templateUrl: 'views/scripts/detail.html'
        }
      }
    });
  }
]);
