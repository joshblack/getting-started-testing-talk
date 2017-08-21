'use strict';

const Deferred = require('fbjs/lib/deferred');

function fetch(...args) {
  const deferred = new Deferred();
  fetch.mock.calls.push(args);
  fetch.mock.deferreds.push(deferred);
  return deferred.getPromise();
}

fetch.mock = {
  calls: [],
  deferreds: [],
};

module.exports = fetch;
