const Home = require('routes/home/components/Home');
const Demo = require('routes/demo/containers/Demo');
const Login = require('routes/auth/containers/Login');
const { withKeyboardAvoidingLayout } = require('components/KeyboardAvoidingLayout');
const { withAuthLayout } = require('components/AuthLayout');

module.exports = [
    {
        path: '/',
        component: Home,
        options: {
            title: 'Home'
        }
    },
    {
        path: '/demo',
        component: withKeyboardAvoidingLayout(Demo),
        options: {
            title: 'Demo'
        }
    },
    {
        path: '/login',
        component: withKeyboardAvoidingLayout(withAuthLayout(Login)),
        options: {
            title: 'Login'
        }
    }
];
