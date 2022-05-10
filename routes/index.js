const { withLayout } = require('components/Layout');
const Home = require('routes/home/components/Home');
const Demo = require('routes/demo/containers/Demo');
const { withKeyboardAvoidingLayout } = require('components/KeyboardAvoidingLayout');

module.exports = [
    {
        path: '/',
        component: withLayout(Home),
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
    }
];
