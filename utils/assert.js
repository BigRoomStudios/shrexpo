module.exports = (condition, message) => {

    if (condition) {
        return;
    }

    if (message instanceof Error) {

        throw message;
    }

    throw new Error(message);
};
