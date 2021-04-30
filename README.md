# shrexpo

> get out of my swamp!

Shrexpo is an opinionated, curated set of tools for building React Native applications.

...

## Requirements

...

## Getting Started

...

## Application Structure

...

### A note on file- and directory-naming
Files should be named with `dash-case.js` except in the case of containers or components, which should use `PascalCase.js`.  This includes reducer, action, and action-type files.  Filenames need not repeat information specified by their directory names.  For example, `containers/Counter.js` or `containers/Counter/index.js` are preferred over `containers/CounterContainer.js` or `containers/CounterContainer/CounterContainer.js`.  The container may still be required into a file using the "full name" e.g.,
```js
const CounterContainer = require('./containers/Counter');
```

Omitting the `.js` extension in calls to `require()` is preferred, as it allows one to transition a simple module at `components/Counter.js` to a complex module with its own internals at `components/Counter/index.js` without affecting how it is referenced.

## Development
### Style
We favor the [hapi style guide](https://hapijs.com/styleguide).  Yes, even when coding for the browser!  The idea is to maintain fluency for developers who work both on the server and in the browser.  It is supposed to be the same language, after all!  Node and V8 move fast enough on their own, so we plan to keep up-to-date with that ecosystem rather than the hyperspeed with which transpilers make available incompletely-spec'd JS features.  It's worth noting that for the time being that includes ES6 modules.  We additionally have some standard React lint rules.  Just `npm run lint` to see how you're doing!

### Developer Tools

...

## Testing
Tests are automatically picked-up by Jest.  You may add tests under any directory named `__test__` or in files suffixed `.spec.js` or `.test.js`.  If you wish to run a coverage report, run `npm test -- --coverage`.

## Deployment

...
