# CI Setup

Once you add testing to a project, one of the natural follow-up questions is
how to automate running it in a CI environment. Internally, it seems like
groups leverage either TravisCI or Jenkins for this purpose.

Regardless of the environment, the only thing that a developer would need to
do to run tests in a CI environment is to make sure the following command is
run:

```bash
yarn test -- --runInBand
```

The `--runInBand` command here will allow Jest to run faster on CI-specific
servers, which are more often than not have single-core CPUs allocated to the
test process. By default, Jest tries to use all the cores on your machine to
perform work in parallel. However, this leads to slower test times in a CI
environment.

For TravisCI projects, this configuration might look like:

```yaml
language: node_js
node_js:
  - '8'

cache:
  directories:
    - node_modules
    - ~/.yarn
    - ~/.nvm

script:
  - yarn test -- --runInBand
```

For Jenkins projects, you might have the following stage in your project:

```groovy
stage('Test') {
  agent {
    docker {
      image 'node:8.3.0'
      reuseNode true
    }
  }

  steps {
    sh 'yarn test -- --runInBand'
  }
}
```

## Coverage

You can also automate coverage checks for your project. For example, if you
want to make sure that diffs merged into your project meet your coverage
thresholds, just make sure you have the thresholds set in your `package.json`
and add the `--coverage` flag to the steps specified above.

For example:

```bash
yarn test -- --runInBand --coverage
```
