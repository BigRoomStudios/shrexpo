const { useState } = require('react');
const { useMiddleEnd } = require('strange-middle-end');
const { useNavigation } = require('@react-navigation/native');
const Login = require('../components/Login');

module.exports = function LoginContainer(props) {

    const m = useMiddleEnd();
    const navigation = useNavigation();
    const [error, setError] = useState('');

    const onSubmit = async ({ email, password }) => {

        setError('');

        const [err, res] = await m.dispatch.auth.login({
            username: email,
            password
        });

        if (err) {

            if (err.response?.status >= 400 && err.response?.status < 500) {
                setError('Invalid Credentials');
            }
            else {
                setError('Something went wrong');
            }
        }
        else {
            navigation.navigate('demo');
        }
    };

    return (<Login {...props} onSubmit={onSubmit} error={error} />);
};
