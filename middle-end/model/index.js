const MiddleEnd = require('strange-middle-end');
const Schema = require('./schema');

const Helpers = require('../helpers');
const { FETCH_CURRENT_USER } = require('../auth/action-types');

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
            {
                ...Helpers.logoutHandlers((model) => {

                    Object.keys(model.indexes).forEach((index) => {

                        if (index === FETCH_CURRENT_USER.BASE    // This index can stay around, as it maintains auth state
                        ) {
                            return;
                        }

                        delete model.indexes[index];
                    });

                    Object.keys(model.entities).forEach((entity) => {

                        model.entities[entity] = {};
                    });
                })
            }
        )),
        selectors: {}
    };
};

internals.composeReducers = (r1, r2) => {

    return (state, action) => r1(r2(state, action), action);
};
