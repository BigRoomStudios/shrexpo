# shrexpo

> get out of my swamp!

Shrexpo is an opinionated, curated set of tools for building React Native applications.

## Requirements

- System requirements: https://docs.expo.io/get-started/installation/#requirements
- expo CLI installed: `npm install -g expo-cli`
- If testing on emulator (installation of required tooling will take 1 hour at absolute minimum, likely a good bit longer; possibly a day if you need to update XCode (if you need to test on iOS))
    - Emulators set up per platform
        - https://docs.expo.io/workflow/android-studio-emulator/
        - https://docs.expo.io/workflow/ios-simulator/
        - Comprehensive guide, covrering both platforms: https://reactnative.dev/docs/environment-setup
- If testing on physical device
    - Expo Go App Installed: https://docs.expo.io/get-started/installation/#2-expo-go-app-for-ios-and


## Getting Started

1. `expo init my-project -t https://github.com/BigRoomStudios/shrexpo`
    - or, for a specific branch: `expo init my-project -t https://github.com/BigRoomStudios/shrexpo/tree/BRANCH-NAME`
2. `cd my-project && expo start` (or `npm start`) — the Expo dev tools GUI should open in a new tab
3. Open the app

   - if running on a simulator, in your terminal, press the key corresponding to the platform you want to test on (`i` for iOS, `a` for Android)
       - If this errors out, saying something like `Couldn't start project on Android: No Android connected device found, and no emulators could be started automatically`, try opening Android Studio, then running the Virtual Device first
   - if running on a device, scan the QR code shown in the dev tools tab

You should see the base app running on your test device of choice!

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
