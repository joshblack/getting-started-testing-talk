# Mocks

Mocks are a great utility to use in testing in order to simulate the behavior
of some existing module in your codebase. For example, imagine you had a
middleware pattern like the following:

```js
// "Security" middleware
'use strict';

const hpp = require('hpp');
const helmet = require('helmet');

import type { Server } from '../types';

module.exports = (server: Server): Server => {
  // Protect against HTTP Parameter Pollution attacks
  server.use(hpp());

  // Secure server by setting various HTTP headers
  server.use(helmet.xssFilter());
  server.use(helmet.frameguard('deny'));
  server.use(helmet.ieNoOpen());
  server.use(helmet.noSniff());

  return server;
};
```

When writing tests for our version of a security middleware, we actually don't
have to use an express instance to make our assertions. Instead, what we can do
is create a "mock" of the server instance that adheres to the same interface
that is needed for the test.

In Jest, we can create mocks in one of two ways:

1) Manually call `jest.mock` in our test suite
2) Create a file in a `__mocks__` folder that matches the name of the expected
module. For example, `__mocks__/express.js` would create the mock for whenever
you call `require('express')` in a test.

Going back to our security middleware, we could use either strategy depending
on the current project.

For manually calling `jest.mock`, we could do the following:

```js
describe('security middleware', () => {
  let mockServer;
  let mockHelmet;
  let hpp;
  let middleware;

  beforeEach(() => {
    // Make sure our mocks reset for each test
    jest.resetModules();
    // For our mock server, we only need a `use` method defined in this test
    // suite
    mockServer = {
      use: jest.fn(),
    };
    // For helmet, we just create mock methods for each of the ones we use
    mockHelmet = {
      xssFilter: jest.fn(),
      frameguard: jest.fn(),
      ieNoOpen: jest.fn(),
      noSniff: jest.fn(),
    };
    // For hpp, we just have to assert that the module itself is called
    jest.mock('hpp');
    jest.mock('helmet', () => mockHelmet);

    // When we require hpp, this will now point to the mock hpp since we
    // specified it as a mock above
    hpp = require('hpp');
    middleware = require('../security');
  });

  it('should use `hpp` to help stop HTTP parameter pollution attacks', () => {
    middleware(mockServer);

    expect(hpp).toHaveBeenCalledTimes(1);
  });

  it('should use helmet to set various HTTP headers', () => {
    middleware(mockServer);

    expect(mockHelmet.xssFilter).toHaveBeenCalledTimes(1);
    expect(mockHelmet.frameguard).toHaveBeenCalledWith('deny');
    expect(mockHelmet.ieNoOpen).toHaveBeenCalledTimes(1);
    expect(mockHelmet.noSniff).toHaveBeenCalledTimes(1);
  });
});
```

Other examples of useful mocks might be ones for `fs` so that you don't have to
rely on files existing on your physical machine. In addition, `fetch` or
`fetchWithRetries` are nice modules to mock in order to simulate network
conditions without ever having to make actual network calls.

An example `fetch` is included [here](../src/mocks).
