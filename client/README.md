# Poule-Poule frontend app

## Architecture

```sh
.
└── src/
    ├── components/ # Generic components for display logic only.
    ├── containers/ # Components with business logic.
    ├── layouts/ # Layout for pages.
    ├── pages/ # Route components
    ├── styles/ # Shared Sass code (variables, utility classes, ...)
    └── utils/ # Various miscelanous code.
```

## How to contribute

### Quick start

```sh
yarn install
yarn start
```

### Lint and format code before committing

Normally, the code is automatically linted and formatted before commits.

```sh
yarn lint
yarn lint:style
yarn format
```

### Tests

```sh
yarn test
```

By default, only test suites based on files changed since the last commit are run.
To force `jest` to run every test suites, use the `--watchAll` option.
