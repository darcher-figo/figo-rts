# Figo React Typescript Template [<img align="right" alt src="https://gist.githubusercontent.com/darcher-/b2156141811e92f5d43e02b70d891211/raw/c2b447fbb85ec75396c57df9f61f63427c5303ba/figo-logo.svg" width="150" height="60">](https://figopetinsurance.com)
A quick-starter template, guide, and reference for future React projects.

:wavy_dash::wavy_dash::wavy_dash::wavy_dash::wavy_dash::wavy_dash::wavy_dash::wavy_dash::wavy_dash::wavy_dash::wavy_dash::wavy_dash::wavy_dash::wavy_dash::wavy_dash:

## Table of Contents

- [Overview](#overview) - High level summary of what we're doing here and how we're going about it..
- [Getting Starter](#getting-started) - What you'll need prior to beginning.
- [Getting Setup](#getting-setup) - How to dig in and get opertational.
  - [Configurations](#configurations)
  - [CLI Commands](#cli-commands)
- [Unit Test Coverage](#unit-test-coverage) - How to ensure we're placing emphasis on quality.
  - [Coverage Reports](#coverage-reports)
- [Technology Stack](#testing--code-coverage) - Our toolset and package dependencies.
  - [Style Guide](#style-guide)
- [Additional Information](#additional-information) - Some React resources for additional learning.

<br />

:wavy_dash::wavy_dash::wavy_dash::wavy_dash::wavy_dash::wavy_dash::wavy_dash::wavy_dash::wavy_dash::wavy_dash::wavy_dash::wavy_dash::wavy_dash::wavy_dash::wavy_dash:

## Overview
This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app). instead of ejecting and taking on the responsibility of `webpack` and `babel` among other things, this is configured to retain the `react-scripts` and reduce the amount of moving parts we need to maintain.

<br />

### Getting Started
In terms of dependencies, this is as lean as they come, instead I recommend installing a few IDE extensions for [VSCode](https://code.visualstudio.com/) to help catch any issues prior to build steps.

|Package|Version|Description|
|:--|:--|:--|
|[SonarLint](https://www.sonarsource.com/products/sonarlint/)|`1.1.0`|Up your coding game and discover issues early. SonarLint in the IDE helps you find & fix bugs and security issues from the moment you start writing code.|
|[Prettier](https://prettier.io/)|`2.8.1`|An opinionated code formatter; Supports many languages; Integrates with most editors; Has few options; Your code is formatted on save; No need to discuss style in code review; Saves you time and energy; &hellip;and more!|
|[ESLint](https://eslint.org/)|`8.31.0`|ESLint statically analyzes your code to quickly find problems. It is built into most text editors and you can run ESLint as part of your continuous integration pipeline.|
|[StyleLint](https://stylelint.io/)|`14.16.1`|A mighty, modern linter that helps you avoid errors and enforce conventions in your styles.|
|[AxeLinter](https://www.deque.com/axe/linters/)|`4.5.2`|The lowest effort, highest return introduction to accessibility.|

<br />

### Getting Setup
Get running locally is a breeze:

```shell
$ gh repo clone darcher-/figo-starter # clone project
$ cd figo-starter # navigate to directory
$ yarn # install dependencies
$ yarn start # initialize react app
```

<p>Clone the project to the local directory of your choosing, install its package dependencies, and intilize the react application.</p>

> :exclamation: **NOTE:** This will be handled over the pipeline and is only necessary for testing purposes.

<br />

### Configurations
In the project directory, you can run:

|Command|Description|
|:-|:-|
|<code>yarn&nbsp;start</code>|Runs the app in the development mode. Open [localhost:3000](http://localhost:3000) to view it in your browser. The page will reload when you make changes. You may also see any lint errors in the console.|
|<code>yarn&nbsp;test</code>|Launches the test runner in the interactive watch mode. See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information. Only functional logic is tested: mock data, setup files, and typings are ignored.|
|<code>yarn&nbsp;build</code>|Builds the app for production to the `build` folder. It correctly bundles React in production mode and optimizes the build for the best performance. The build is minified and the filenames include the hashes.|
|<code>yarn&nbsp;lint</code>|Automated Cleaning and formating of source code for a more consisten and stable experience. Developers can instead focus on writing code and feature work. (:soon: _More file extensions will be supported soon_)|

<br />

#### CLI commands
```sh

# yarn start
node_modules/.bin/react-scripts start

# yarn test
node_modules/.bin/react-scripts test .
  --coverage
  --collectCoverageFrom=src/**/*.{ts,tsx}
  --collectCoverageFrom=!src/**/*.{fixture,setup,d}.{ts,tsx}
  --collectCoverageFrom=!src/index.tsx

# yarn build
node_modules/.bin/react-scripts build

# yarn lint
node_modules/.bin/eslint src
  --ext .ts,.tsx
  --fix &&
node_modules/.bin/prettier src/**/*.{ts,tsx}
  --write

```

<br />

## Unit Test Coverage
This app utilizes [_Jest_](https://jestjs.io/) aslongside React's testing library to allow easy access and managment of unit tests with the `yarn test` script.

> :exclamation: **NOTE:** [Cypress](https://cypress.io/) will also be integrated and utilized to test UI flows.

<br />

### Coverage Reports
Coverage reports are generated and output into the `coverage` directory in the projects root directory.

e.g. for `macOS` users, the path to the unit test report looks like this:

```sh
file:///Users/{user_name}/dev/apps/figo-starter/coverage/lcov-report/index.html
```

<br />

#### Security Scans

> :soon: **NOTE:** Fortify/Sonar scans will need to be included here...

<br />

## Technology Stack
Package | Version | Description |
|:-|:-|:-|
|[React](https://reactjs.org/)|`18.2.0`|A JavaScript library for building user interfaces.|
|[Typescript](https://www.typescriptlang.org/)|`4.9.4`|A strongly typed programming language that builds on JavaScript, giving you better tooling at any scale.|
|[SCSS](https://sass-lang.com/)|`1.57.1`|Sass is the most mature, stable, and powerful professional grade CSS extension language in the world.|
|[Cypress](https://www.cypress.io/)|`12.3.0`|Fast, easy and reliable testing for anything that runs in a browser.|
|[Jest](https://jestjs.io/)|`29.3.1`|A delightful JavaScript Testing Framework with a focus on simplicity.|
|[Webpack](https://webpack.js.org/)|`5.75.0`|A static module bundler for modern JavaScript applications. |
|[Babel](https://babeljs.io/)|`7.20.12`|Babel is a JavaScript compiler. Use next generation JavaScript, today.|

<br />

### Style Guide
Visit the [Wiki](https://github.com/darcher-figo/figo-rts/wiki) to reivew the Style Guides and standardizations.

<br />

## Additional Information
You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

- [Deployments](https://facebook.github.io/create-react-app/docs/deployment)
- [Code splitting](https://facebook.github.io/create-react-app/docs/code-splitting)
- [Advanced configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)
- [Analyzing the bundle size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)
- [Making a progressive web app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)
- [**Troubleshooting:** `yarn dist` fails to minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)

</dl>

To learn React, check out the [React documentation](https://reactjs.org/).
