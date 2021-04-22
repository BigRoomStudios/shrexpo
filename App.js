'use strict';

const React = require('react');
const { StatusBar } = require('expo-status-bar');
const { ThemeProvider } = require('styled-components');
const { NavigationContainer } = require('@react-navigation/native');
const { createStackNavigator } = require('@react-navigation/stack');
const ReactRedux = require('react-redux');
const MiddleEnd = require('strange-middle-end');
const M = require('middle-end');
const Theme = require('theme');
const Routes = require('routes');

const middleEnd = M.create({
    basePath: process.env.BASE_PATH,
    logErrors: process.env.NODE_ENV !== 'test'
}).initialize();

const Stack = createStackNavigator();

module.exports = function App() {

    return (
        <ThemeProvider theme={Theme}>
            <MiddleEnd.Provider middleEnd={middleEnd}>
                <ReactRedux.Provider store={middleEnd.store}>
                    <NavigationContainer>
                        <Stack.Navigator>
                            {Routes.map(({ path, component, options }) => {

                                return (
                                    <Stack.Screen
                                        name={path}
                                        component={component}
                                        options={options}
                                    />
                                );
                            })}
                        </Stack.Navigator>
                    </NavigationContainer>
                    <StatusBar style="auto" />
                </ReactRedux.Provider>
            </MiddleEnd.Provider>
        </ThemeProvider>
    );
};
