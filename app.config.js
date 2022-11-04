'use strict';

// https://docs.expo.io/guides/environment-variables
// https://docs.expo.io/workflow/configuration/

module.exports = ({ config }) => ({
    ...config,
    extra: {
        apiUrl: process.env.API_URL
    }
});
