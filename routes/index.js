const { withKeyboardAvoidingLayout } = require('components/KeyboardAvoidingLayout');
const { withAuthLayout } = require('components/AuthLayout');
const Home = require('routes/home/components/Home');
const Demo = require('routes/demo/containers/Demo');
const Login = require('routes/auth/containers/Login');
const Signup = require('routes/auth/containers/Signup');
const Protected = require('routes/auth/components/Protected');

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
            title: 'Log In'
        }
    },
    {
        path: '/signup',
        component: withKeyboardAvoidingLayout(withAuthLayout(Signup)),
        options: {
            title: 'Sign Up'
        }
    },
    {
        path: '/protected',
        component: Protected,
        options: {
            title: 'Exclusive Page'
        }
    }
];
