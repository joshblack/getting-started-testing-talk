# BDD

BDD, an acronym for Behavior Driven Development, because is a testing paradigm
for describing functionality and stating how the module should behave.

In practice, this means that each test file would follow the pattern:

```js
'use strict';

describe('some module', () => {
  it('should do this thing', () => {
  });
});
```

For a specific example, see the tests for the [`List` module](../src/bdd/__tests__/List-test.js).

In addition to the globals `describe` and `it`, there are also some methods we
can use in these BDD-style blocks for setting up/tearing down things that we
might need for the tests. These hooks include:

- `beforeEach`
- `afterEach`
- `beforeAll`
- `afterAll`
