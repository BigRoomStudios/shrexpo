'use strict';

const MiddleEnd = require('strange-middle-end');
const Redux = require('redux');
const ReduxDevtools = require('redux-devtools-extension/logOnlyInProduction');

exports.create = (options = {}) => {

    const middleEnd = MiddleEnd.create({
        mods: () => ({

        }),
        createStore: (reducer, { router }) => {

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
