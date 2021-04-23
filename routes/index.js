const Home = require('routes/home/components/Home');
const Demo = require('routes/demo/containers/Demo');

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
        component: Demo,
        options: {
            title: 'Demo'
        }
    }
];
