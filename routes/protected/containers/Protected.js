const { useState } = require('react');
const { useMiddleEnd } = require('strange-middle-end');
const { useNavigation } = require('@react-navigation/native');
const Protected = require('../components/Protected');

module.exports = function ProtectedContainer(props) {

    const m = useMiddleEnd();
    const navigation = useNavigation();

    const onPressLogout = async () => {

        try {
            await m.dispatch.auth.logout();
        }
        finally {
            navigation.navigate('login');
        }
    };

    return (<Protected {...props} onPressLogout={onPressLogout} />);
};
