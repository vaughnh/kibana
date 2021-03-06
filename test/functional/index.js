define(function (require) {
  require('intern/dojo/node!../support/env_setup');

  const bdd = require('intern!bdd');
  const intern = require('intern');
  const initCallbacks = [];

  function onInit(callback) {
    initCallbacks.push(callback);
  }

  global.__kibana__intern__ = { intern, bdd, onInit };

  bdd.describe('kibana', function () {
    bdd.before(function () {
      initCallbacks.forEach(callback => {
        callback.call(this);
      });
    });

    require([
      'intern/dojo/node!../support/index',
      'intern/dojo/node!./apps/discover',
      'intern/dojo/node!./status_page',
      'intern/dojo/node!./apps/management',
      'intern/dojo/node!./apps/visualize',
      'intern/dojo/node!./apps/console',
      'intern/dojo/node!./apps/dashboard'
    ], function () {});
  });
});
