const MiddleEnd = require('strange-middle-end');
const Redux = require('redux');
const ReduxDevtools = require('redux-devtools-extension/logOnlyInProduction');

const App = require('./app');
const Auth = require('./auth');
const Model = require('./model');
const Counter = require('./counter');

exports.create = (options = {}) => {

    const middleEnd = MiddleEnd.create({
        mods: () => ({
            counter: Counter(middleEnd, options),
            app: App(middleEnd, options),
            auth: Auth(middleEnd, options),
            model: Model(middleEnd, options)
        }),
        createStore: (reducer) => {

            const middleware = [
                MiddleEnd.middleware.thunk,
                options.logErrors && MiddleEnd.middleware.errorLogger
            ];

            return Redux.createStore(reducer, ReduxDevtools.composeWithDevTools(
                Redux.applyMiddleware(...middleware.filter(Boolean))
            ));
        }
    });

    return middleEnd;
};
