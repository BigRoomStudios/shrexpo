const MiddleEnd = require('strange-middle-end');

module.exports = MiddleEnd.createTypes('auth', {
    FETCH_CURRENT_USER: MiddleEnd.type.async,
    LOGIN: MiddleEnd.type.async,
    LOGOUT: MiddleEnd.type.async,
    REGISTER: MiddleEnd.type.async
});
