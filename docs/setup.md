# Project setup

- [Jest](https://facebook.github.io/jest/)
- `jest`, `babel-jest`, babel plugins, module transformers
- Jest config options
  - [Transformers](https://facebook.github.io/jest/docs/configuration.html#transform-object-string-string)
    - "A transformer is a module that provides a synchronous function for transforming source files."
    - [`fileTransform.js`](../config/jest/fileTransform.js)
    - [`cssTransform.js`](../config/jest/cssTransform.js)
    - [`jsTransform.js`](../config/jest/fileTransform.js)
  - `--no-cache` flag since transformers run only on files that have changed, not when setup/config changes
  - TODO: coverage options, pass/fail criteria in CI
