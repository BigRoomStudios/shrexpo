const { withLayout } = require('components/Layout');
const Home = require('routes/home/components/Home');
const Demo = require('routes/demo/containers/Demo');

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
        component: withLayout(Demo),
        options: {
            title: 'Demo'
        }
    }
];
