const { useCallback } = require('react');
const SplashScreen = require('expo-splash-screen');
const { StatusBar } = require('expo-status-bar');
const { ThemeProvider } = require('styled-components');
const { NavigationContainer } = require('@react-navigation/native');
const { createStackNavigator } = require('@react-navigation/stack');
const ReactRedux = require('react-redux');
const MiddleEnd = require('strange-middle-end');
const Eva = require('@eva-design/eva');
const { GestureHandlerRootView } = require('react-native-gesture-handler');
const { ApplicationProvider } = require('@ui-kitten/components');
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

SplashScreen.preventAutoHideAsync();

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

    const onLayoutRootView = useCallback(async () => {

        if (fontsLoaded) {
            await SplashScreen.hideAsync();
        }

    }, [fontsLoaded]);

    if (!fontsLoaded) {
        return null;
    }

    return (
        <GestureHandlerRootView style={{ flex: 1 }} onLayout={onLayoutRootView}>
            <ThemeProvider theme={Theme}>
                <ApplicationProvider {...Eva} theme={{ ...Eva.light, ...Theme }}>
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
                </ApplicationProvider>
            </ThemeProvider>
        </GestureHandlerRootView>
    );
};
