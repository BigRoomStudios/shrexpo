const MiddleEnd = require('strange-middle-end');
const AuthTokenUtils = require('../../utils/auth-token');

const {
    FETCH_CURRENT_USER,
    LOGIN,
    REGISTER
} = require('./action-types');

const { createAction } = MiddleEnd;

module.exports = (m) => {

    const getClient = () => {

        const { client } = m.mods.app;
        return client;
    };

    return {
        initialize: () => m.dispatch.auth.fetchCurrentUser(),
        actions: {
            fetchCurrentUser: createAction(FETCH_CURRENT_USER, {
                index: true,
                handler: async () => {

                    const client = getClient();
                    const { data: results } = await client.get('/validate');


                    return results.pallie;
                }
            }),
            login: createAction(LOGIN, {
                handler: async ({ username, password }) => {

                    const client = getClient();

                    const { data: results } = await client.post('/login', {
                        username,
                        password
                    }, {
                        reauthorize: false
                    });

                    await AuthTokenUtils.store(results);

                    const [err, user] = await m.dispatch.auth.fetchCurrentUser();

                    if (err) {
                        throw err;
                    }

                    return user;
                }
            }),
            register: createAction(REGISTER, {
                handler: async ({ username, password }) => {

                    const client = getClient();

                    const { data: results } = await client.post('/register', {
                        username,
                        password
                    });

                    return results;
                },
                // Needs feedback. Not sure if this is how we want to handle successful registration
                after: async ({ original: { username, password } }) => {

                    await m.dispatch.auth.login({ username, password });
                }
            })
        },
        selectors: {
            getIsAuthenticated: ({ model }) => {

                const { [FETCH_CURRENT_USER.BASE]: user } = model.indexes;
                return !!user && !!user.result;
            },
            getHasAuthenticationSettled: ({ model }) => {

                const { [FETCH_CURRENT_USER.BASE]: index } = model.indexes;
                return !!index && !index.inFlight;
            }
        }
    };
};
