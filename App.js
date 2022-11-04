const { default: AppLoading } = require('expo-app-loading');
const { StatusBar } = require('expo-status-bar');
const { ThemeProvider } = require('styled-components');
const { NavigationContainer } = require('@react-navigation/native');
const { createStackNavigator } = require('@react-navigation/stack');
const ReactRedux = require('react-redux');
const MiddleEnd = require('strange-middle-end');
const Eva = require('@eva-design/eva');
const { GestureHandlerRootView } = require('react-native-gesture-handler');
const { ApplicationProvider } = require('@ui-kitten/components');
const { default: ExpoConstants } = require('expo-constants');
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

const internals = {};

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
        <GestureHandlerRootView style={{ flex: 1 }}>
            <ThemeProvider theme={Theme}>
                <ApplicationProvider {...Eva} theme={{ ...Eva.light, ...Theme }}>
                    <MiddleEnd.Provider middleEnd={internals.middleEnd}>
                        <ReactRedux.Provider store={internals.middleEnd.store}>
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
                </ApplicationProvider>
            </ThemeProvider>
        </GestureHandlerRootView>
    );
};

// e.g. 192.168.0.0:19000 (private IP on expo dev server port)
// --> 192.168.0.0:3000 (private IP on API's default port)
// hostUri is NOT set in production
internals.localUrl = () => __DEV__ && `http://${ExpoConstants.manifest?.hostUri.split(':')[0].concat(':3000')}`;

internals.middleEnd = M.create({
    apiBaseUrl: ExpoConstants.manifest.extra?.apiUrl || internals.localUrl(),
    logErrors: process.env.NODE_ENV !== 'test'
}).initialize();
