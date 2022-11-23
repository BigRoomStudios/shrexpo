const { default: Axios } = require('axios');
const AuthTokenUtils = require('../utils/auth-token');

const internals = {};

module.exports = (m, options) => {

    const { apiBaseUrl } = options;

    const client = internals.createClient({ baseURL: apiBaseUrl });

    return {
        client
    };
};

internals.createClient = (options) => {

    const client = Axios.create({
        headers: { common: {} },
        // Needed for refresh token, esp. in local development
        withCredentials: true,
        paramsSerializer: {
            serialize: (obj) => {
                // The default serializer turns array params into ?trades[]=A&trades[]=B
                // which is not compatible with node's querystring parser which wants ?trades=A&trades=B.
                // Luckily URLSearchParams and node are in agreement, so we can customize for it below.

                if (!obj) {
                    return '';
                }

                if (typeof obj === 'string') {
                    return obj;
                }

                const params = new URLSearchParams();
                const append = (key, val) => {

                    val = val instanceof Date ? val.toISOString() : val;

                    params.append(key, val);
                };

                Object.entries(obj).forEach(([key, value]) => {

                    if (Array.isArray(value)) {
                        value.forEach((val) => append(key, val));
                    }
                    else {
                        append(key, value);
                    }
                });

                return params.toString();
            }
        },
        ...options
    });

    client.interceptors.request.use(
        async (config) => {

            const accessToken = await AuthTokenUtils.get('accessToken');

            if (accessToken) {
                config.headers.Authorization = `Bearer ${accessToken}`;
            }

            return config;
        }
    );

    client.logout = async (opts) => {

        try {
            await client.post('/logout', null, opts);
        }
        finally {
            AuthTokenUtils.clear();
        }
    };

    client.interceptors.response.use(null, async (error) => {

        if (error.config?._isRetry) {
            throw error;
        }

        const accessToken = await AuthTokenUtils.get('accessToken');
        const refreshToken = await AuthTokenUtils.get('refreshToken');

        // If we receive a 401, hit '/reauthorize',
        // store the new token and retry the request
        if (
            error.config &&
            error.config.reauthorize !== false &&
            error.response?.status === 401 &&
            accessToken &&
            refreshToken
        ) {

            error.config._isRetry = true;

            try {
                const { data: results } = await client.post('/reauthorize', { refreshToken }, {
                    reauthorize: false,
                    logoutOnFailure: true
                });
                if (results.data) {
                    await AuthTokenUtils.store(results.data);
                }
            }
            catch (reauthErr) {

                if (Axios.isAxiosError(reauthErr)) {
                    // Rethrow the original error if /reauthorize fails so that
                    // consumers don't have to worry about this case.
                    throw error;
                }

                // Something unexpected, non-HTTP went wrong during reauth
                throw reauthErr;
            }

            // Retry after successful
            return client.request(error.config);
        }

        throw error;
    });

    return client;
};
