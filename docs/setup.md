# Project setup

## Test Runner

The test runner that we're going to be incorporating into our project today is
called [Jest](https://facebook.github.io/jest/). This test runner tries to
provide a set of sensible defaults for your tests so that there isn't much
configuration needed on your end.

## Dependencies

In order to use Jest, we'll bring in a couple of devDependencies, namely:

- `jest`
- `babel-jest` if our project needs to support transpilation
  - Any babel-related plugin or presets

## Configuration

Jest supports configuration through CLI options, through a standalone
`jest.config.js` file, or through the `jest` property defined in your
`package.json` file.

In this walkthrough, we're setting it up in our `package.json` file with the
following configuration:

```json
"jest": {
  "collectCoverageFrom": [
    "src"
  ],
  "setupFiles": [
    "<rootDir>/config/polyfills.js"
  ],
  "testMatch": [
    "<rootDir>/**/__tests__/**/*.js?(x)",
    "<rootDir>/**/?(*.)(spec|test).js?(x)"
  ],
  "testEnvironment": "node",
  "transform": {
    "^.+\\.(js|jsx)$": "<rootDir>/config/jest/jsTransform.js",
    "^.+\\.css$": "<rootDir>/config/jest/cssTransform.js",
    "^(?!.*\\.(js|jsx|css|json)$)": "<rootDir>/config/jest/fileTransform.js"
  },
  "transformIgnorePatterns": [
    "[/\\\\]node_modules[/\\\\].+\\.(js|jsx)$"
  ],
  "moduleFileExtensions": [
    "js",
    "json"
  ]
}
```

### Transformers

Once our devDependencies are installed and our configuration object is
initialized, we'll need to setup a couple useful module [transformers](https://facebook.github.io/jest/docs/configuration.html#transform-object-string-string). From the Jest docs:

> "A transformer is a module that provides a synchronous function for
> transforming source files."

In our case, we setup a couple initial transformers. None of these are
necessarily needed for your project, but more likely than not you'll want
something similar to what these provide.

Specifically, we setup support for generic files, CSS files, and JS files:

- [`fileTransform.js`](../config/jest/fileTransform.js)
- [`cssTransform.js`](../config/jest/cssTransform.js)
- [`jsTransform.js`](../config/jest/fileTransform.js)

__Gotcha: while setting up this part of your project, you might find the `--no-cache` flag useful since transformers run only on files that have changed, not when setup/config changes.__

## Coverage

Jest supports passing in the `--coverage` option for collecting coverage information about your tests.

We can also specify project-specific coverage goals for the following
information:

```json
"coverageThreshold": {
  "global": {
    "branches": 80,
    "functions": 80,
    "lines": 80,
    "statements": 80
  }
}
```
