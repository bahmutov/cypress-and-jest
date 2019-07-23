# cypress-and-jest
> Cypress and Jest both with code coverage running unit tests

The source code is in the folder [src](src). There is really just a single file [src/calc.js](src/calc.js). Let's cover this file with unit tests by using two test runners: [Jest](https://jestjs.io/) and [Cypress](https://www.cypress.io).

## Jest init

The Jest was initialized using `npx jest --init` command likes this:

![Jest init](images/jest-init.png)

In the generated [jest.config.js](jest.config.js) enable code coverage collection, and output into folder `jest-coverage` (to avoid clashing with Cypress coverage report).

```js
// jest.config.js
module.exports = {
  // Indicates whether the coverage information should be collected while executing the test
  collectCoverage: true,
  // The directory where Jest should output its coverage files
  coverageDirectory: 'jest-coverage',
  // The test environment that will be used for testing
  testEnvironment: 'node'
}
```

The Jest test is in [__tests__/calc.test.js](__tests__/calc.test.js) and only runs the `add` function. We can run the Jest tests and see the coverage summary.

![Jest test](images/jest-test.png)

The coverage reports in `jest-coverage` folder by default include LCOV and static HTML. The HTML report shows that the inside of the function `sub` was not reached by the Jest tests.

![Jest coverage](images/jest-coverage.png)

## Cypress init

Initialize Cypress with `npx @bahmutov/cly init` command.

![Cypress init](images/cypress-init.png)

In [cypress/integration/spec.js](cypress/integration/spec.js) let's require `sub` function and test it

```js
// cypress/integration/spec.js
const { sub } = require('../../src/calc')
it('subtracts 10 - 5', () => {
  expect(sub(10, 5)).to.equal(5)
})
```

The test passes

![Cypress test](images/cypress-test.png)

## Cypress code coverage setup

Code coverage in Cypress is done via [@cypress/code-coverage](https://github.com/cypress-io/code-coverage) plugin. I suggest following the installation instructions in that repo. Quick summary here.

Install it and its peer dependencies. Because we are going to instrument unit tests, we also need to install `babel-plugin-istanbul`.

```sh
npm i -D @cypress/code-coverage nyc istanbul-lib-coverage babel-plugin-istanbul
```

Add to your [cypress/support/index.js](cypress/support/index.js) file:

```js
import '@cypress/code-coverage/support'
```

Register tasks in your [cypress/plugins/index.js](cypress/plugins/index.js) file:

```js
module.exports = (on, config) => {
  on('task', require('@cypress/code-coverage/task'))
  on('file:preprocessor', require('@cypress/code-coverage/use-babelrc'))
}
```

and add `.babelrc` file

```
{
  "plugins": ["istanbul"]
}
```

Because we saved the Jest coverage report in `jest-coverage`, set Cypress to save its coverage to `cypress-coverage`. Since `nyc` is used to generate the report, add `nyc` object to [package.json](package.json) file.

```json
{
  "nyc": {
    "report-dir": "cypress-coverage"
  }
}
```

Run Cypress with `npx cypress open` and a report should be saved. As you can see, we have missed the `add` function!

![Cypress coverage](images/cypress-coverage.png)



## More info

- Cypress [code coverage guide](https://on.cypress.io/code-coverage)
- [@cypress/code-coverage](https://github.com/cypress-io/code-coverage) plugin
