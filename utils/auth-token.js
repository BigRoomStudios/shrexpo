const SecureStore = require('expo-secure-store');

const internals = {};

exports.get = async (key) => {

    const { secureStoreConf } = internals;

    const token = await SecureStore.getItemAsync(key, secureStoreConf.options);

    if (key === 'refreshToken') {
        return JSON.parse(token);
    }

    return token;
};

exports.store = ({ accessToken, refreshToken } = {}) => {

    const { secureStoreConf: { keys, options } } = internals;

    return Promise.all([
        SecureStore.setItemAsync(keys.accessToken, accessToken, options),
        SecureStore.setItemAsync(keys.refreshToken, JSON.stringify(refreshToken), options)
    ]);
};

exports.clear = () => {

    const { secureStoreConf: { keys, options } } = internals;

    return Promise.all([
        SecureStore.deleteItemAsync(keys.accessToken, options),
        SecureStore.deleteItemAsync(keys.refreshToken, options)
    ]);
};

internals.secureStoreConf = {
    keys: {
        accessToken: 'accessToken',
        refreshToken: 'refreshToken'
    },
    options: {
        keyChainAccessible: SecureStore.WHEN_UNLOCKED
    }
};
