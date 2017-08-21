# Async-testing

With ES2015, we began to have the ability to express values that may not be
available immediately through Promises. These asynchronous methods are becoming
more and more common as we interface with things like APIs to access data in
our applications. As a result, Jest allows us to test these asynchronous
methods by allowing us to return promises in the callback methods of tests.

For example:

```js
it('should work asynchronously', async () => {
  const result = await someAsyncMethod();
  expect(result).toEqual(/* ... */);
});
```

However, sometimes your methods may be running several promises behind the
scenes, and so using `async`/`await` might not flush the promise queue. In this
case, you can just use a simple `setTimeout` like:

```js
it('should work with setTimeout', async (done) => {
  const promise = someAsyncMethod();

  setTimeout(() => {
    try {
      const result = await promise;
      expect(result).toEqual(/* ... */);
      done();
    } catch (error) {
      done.fail(error);
    }
  });
});
```

For an example of `async` tests, check out the tests for [mocks](../src/mocks).
