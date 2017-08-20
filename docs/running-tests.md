# Running Tests

With Jest, you can run all the tests in your project by running `jest`. In
general, it's helpful to alias this to a script in your `package.json` file.
For example, in this project, we create the following script `test`:

```json
{
  "scripts": {
    "test": "jest"
  }
}
```

This setup also allows us to pass in additional arguments to Jest by using the
`--` option. For example, if we wanted to run all the tests without the cache
we could run: `yarn test -- --no-cache`. `--no-cache` in this case would be
passed along to the `yarn test` command, which is just an alias for `jest`.

## Watch mode

While developing, it might be more useful to use Jest's watch mode. To use
this functionality, just pass in the `--watch` flag like: `yarn test --
--watch`. This will launch Jest's default watch-mode, and will run tests that
are related to files that have changed.

Note the additional options that watch mode provide, such as:

- Running all tests
- Run tests that match a regex test name
- Run specific suites that match a regex string
