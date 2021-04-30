const MiddleEnd = require('strange-middle-end');

const internals = {};

module.exports = (m) => {

    const {
        INCREMENT,
        DOUBLE
    } = MiddleEnd.createTypes('counter', {
        INCREMENT: MiddleEnd.type.simple,
        DOUBLE: MiddleEnd.type.async
    });

    return {
        initialize() {

        },
        actions: {
            increment: MiddleEnd.createAction(INCREMENT, ({ amount }) => {

                return { amount };
            }),
            double: MiddleEnd.createAction(DOUBLE, async () => {

                await internals.wait(200);

                const currentCount = m.select.counter.getValue();

                m.dispatch.counter.increment({ amount: currentCount });
            })
        },
        selectors: {
            getValue: ({ counter }) => counter
        },
        reducer: MiddleEnd.createReducer(0, {
            [INCREMENT]: (state, { payload }) => state + payload.amount
        })
    };
};

internals.wait = (ms) => {

    return new Promise((resolve) => setTimeout(resolve, ms));
};
