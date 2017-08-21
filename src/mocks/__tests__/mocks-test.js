'use strict';

const genSuccessResponse = value => ({
  ok: true,
  json: () => Promise.resolve(value),
});

const genFailureResponse = () => ({
  ok: false,
});

describe('mocks example', () => {
  let fetch;
  let makeRequest;

  beforeEach(() => {
    jest.resetModules();
    fetch = require('whatwg-fetch');
    makeRequest = require('../mocks').default;
    global.fetch = fetch;
  });

  it('should work with generating successful requests', async () => {
    const options = {method: 'GET'};
    const promise = makeRequest(options);
    const response = {foo: 'bar'};

    fetch.mock.deferreds[0].resolve(genSuccessResponse(response));

    expect(await promise).toEqual(response);
  });

  it('should work with generating failure requests', async () => {
    const options = {method: 'GET'};
    const promise = makeRequest(options);

    fetch.mock.deferreds[0].reject(genFailureResponse());

    expect(await promise).toEqual({
      error: {ok: false},
      type: 'error',
    });
  });
});
