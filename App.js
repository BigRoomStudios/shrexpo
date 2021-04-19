'use strict';

const React = require('react');
const { StatusBar } = require('expo-status-bar');
const { ConnectedRouter: Router } = require('connected-react-router');
const StrangeRouter = require('strange-router');
const { ThemeProvider } = require('styled-components');
const ReactRedux = require('react-redux');
const MiddleEnd = require('strange-middle-end');
const M = require('middle-end');
const Theme = require('theme');
const Routes = require('routes');

const middleEnd = M.create({
    basePath: process.env.BASE_PATH,
    logErrors: process.env.NODE_ENV !== 'test'
}).initialize();

module.exports = function App() {

    return (
        <ThemeProvider theme={Theme}>
            <MiddleEnd.Provider middleEnd={middleEnd}>
                <ReactRedux.Provider store={middleEnd.store}>
                    <Router history={middleEnd.mods.router.history}>
                        <StrangeRouter.Routes routes={Routes} />
                    </Router>
                    <StatusBar style="auto" />
                </ReactRedux.Provider>
            </MiddleEnd.Provider>
        </ThemeProvider>
    );
};
