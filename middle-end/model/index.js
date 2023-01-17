const MiddleEnd = require('strange-middle-end');
const Schema = require('./schema');

const internals = {};

module.exports = (m) => {

    const {
        createReducer,
        createEntityReducer
    } = MiddleEnd;

    const entityReducer = createEntityReducer({
        schema: Schema,
        shouldMerge: true
    });

    return {
        schema: Schema,
        actions: {},
        reducer: internals.composeReducers(entityReducer, createReducer(
            {
                mutable: true
            },
            { /* add initial state here */},
            { /* add handlers here */}
        )),
        selectors: {}
    };
};

internals.composeReducers = (r1, r2) => {

    return (state, action) => r1(r2(state, action), action);
};
