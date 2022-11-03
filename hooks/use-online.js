const { useState, useEffect } = require('react');
const NetInfo = require('@react-native-community/netinfo');

exports.useOnline = function useOnline() {

    const [online, setOnline] = useState(true);

    useEffect(() => {

        const handleOnline = (state) => {

            setOnline(state.isConnected);
        };

        const unsubscribe = NetInfo.addEventListener(handleOnline);

        return () => {

            unsubscribe();
        };

    }, []);

    return online;
};
