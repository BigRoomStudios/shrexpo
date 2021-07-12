const Layout = require('components/Layout');
const Home = require('routes/home/components/Home');
const Demo = require('routes/demo/containers/Demo');

module.exports = [
    {
        path: '/',
        component: Layout(Home),
        options: {
            title: 'Home'
        }
    },
    {
        path: '/demo',
        component: Layout(Demo),
        options: {
            title: 'Demo'
        }
    }
];
