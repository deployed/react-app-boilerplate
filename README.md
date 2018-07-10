# Deployed.pl React App Boilerplate

Basic production ready [React](https://reactjs.org/) application configuration.

Configuration based on [Razzle](https://github.com/jaredpalmer/razzle) and inspired by
[React Boilerplate](https://github.com/react-boilerplate/react-boilerplate)

## Quick start

### Requirements

* `node>=8.10`
* `yarn>=1.7`
* `python` - to install virtualenv
* See Dockerfile for other dependencies

### Installation

We are using python's `virtualenv` to create independent project environments.

1. Install python `virtualevnwrapper`.

1. Setup virtual environment

    > mkvirtualenv --python=python3.5 project-name

    > echo cd ${PWD} >> ~/.virtualenvs/project-name/bin/postactivate

1. Install `nodejs` in your virtualenv

    > pip install nodeenv
    
    Install newest `node` 8 version. You can check available version using command `nodeenv --list`
    
    > nodeenv -p --prebuilt --node=8.11.3

1. Install project dependencies

    > yarn install


### Commands

**NOTE** The boilerplate requires backend server providing graphql API.

#### Development

```Shell
yarn start
```

Run development server at `127.0.0.1:3000`.

#### Environment variables

You can use environment variable `PORT` to use another port
and `HOST` to change default host. Another way is to set custom
variables in `.env` files ([dotenv](https://github.com/motdotla/dotenv)) - check
[Razzle's documentation](https://github.com/jaredpalmer/razzle#what-other-env-files-are-can-be-used)
to learn more. `*.local` files are excluded from git.

#### Testing

```Shell
yarn test
```
Runs all tests and returns coverage report.

```Shell
yarn test:watch
```
Run tests in `jest` watch mode.


#### Linting

```Shell
npm run lint
```

## Pycharm (IntelliJ) configuration

### Recommended IntelliJ plugins

* [Es6 intentions](https://plugins.jetbrains.com/plugin/8366-es6-intentions)
* [EditorConfig](https://plugins.jetbrains.com/plugin/7294-editorconfig)
* [NodeJS](https://plugins.jetbrains.com/plugin/6098-nodejs)
* [JS GraphQL](https://plugins.jetbrains.com/plugin/8097-js-graphql)
* [Styled Components](https://plugins.jetbrains.com/plugin/9997-styled-components)


## Technology stack

* [React](https://reactjs.org/)
* [MobX](https://mobx.js.org/getting-started.html)
* [React Router](https://reacttraining.com/react-router/)
* [React Loadable](https://github.com/jamiebuilds/react-loadable)
* [Styled Components](https://www.styled-components.com/)
* [GraphQL](https://graphql.org/)
* [React Apollo](https://www.apollographql.com/docs/react/)
* [React Helmet](https://github.com/nfl/react-helmet)
* [React Intl](https://github.com/yahoo/react-intl)
* [Razzle](https://github.com/jaredpalmer/razzle)
* [Express](https://expressjs.com/)
* [Jest](https://jestjs.io/)
* [Enzyme](https://github.com/airbnb/enzyme)
