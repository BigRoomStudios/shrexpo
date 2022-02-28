const { default: AppLoading } = require('expo-app-loading');
const { StatusBar } = require('expo-status-bar');
const { ThemeProvider } = require('styled-components');
const { NavigationContainer } = require('@react-navigation/native');
const { createStackNavigator } = require('@react-navigation/stack');
const ReactRedux = require('react-redux');
const MiddleEnd = require('strange-middle-end');
const { KeyboardAvoidingView, SafeAreaView, Platform } = require('react-native');
const M = require('middle-end');
const Theme = require('theme');
const Routes = require('routes');
const {
    useFonts,
    OpenSans_400Regular,
    OpenSans_400Regular_Italic,
    OpenSans_700Bold,
    OpenSans_700Bold_Italic
} = require('@expo-google-fonts/open-sans');

const middleEnd = M.create({
    logErrors: process.env.NODE_ENV !== 'test'
}).initialize();

const Stack = createStackNavigator();

module.exports = function App() {

    const [fontsLoaded] = useFonts({
        OpenSans_400Regular,
        OpenSans_400Regular_Italic,
        OpenSans_700Bold,
        OpenSans_700Bold_Italic
    });

    if (!fontsLoaded) {
        return <AppLoading />;
    }

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : null}
            style={{ flex: 1 }}
        >
            <SafeAreaView style={{ flex: 1 }}>
                <ThemeProvider theme={Theme}>
                    <MiddleEnd.Provider middleEnd={middleEnd}>
                        <ReactRedux.Provider store={middleEnd.store}>
                            <NavigationContainer>
                                <Stack.Navigator>
                                    {Routes.map(({ path, component, options }) => {

                                        return (
                                            <Stack.Screen
                                                key={path}
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
            </SafeAreaView>
        </KeyboardAvoidingView>
    );
};
