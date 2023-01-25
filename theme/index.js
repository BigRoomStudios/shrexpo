const EvaTheme = require('./eva');
const { Color, paletteFromTheme, spacing, createBreakpoints } = require('./helpers');
const { Easing } = require('react-native');

module.exports = {
    ...EvaTheme,
    spacing,
    palette: {
        slate: new Color({
            100: '#FFFFFF',
            200: '#FAFAFA',
            300: '#F7F7F7',
            400: '#F0F0F0',
            500: '#EEEEEE',
            600: '#DDDDDD',
            700: '#CCCCCC',
            800: '#BBBBBB',
            900: '#AAAAAA'
        }),
        etch: new Color({
            100: '#111111',
            200: '#222222',
            300: '#333333',
            400: '#444444',
            500: '#555555',
            600: '#666666',
            700: '#777777',
            800: '#888888',
            900: '#999999'
        }),
        etchTranslucent: new Color({
            300: 'rgba(51, 51, 51, .5)'
        }),
        ...paletteFromTheme(EvaTheme)
    },
    typography: {
        primary: 'OpenSans_400Regular'
    },
    shape: {
        borderRadius: 4,
        boxShadow: `${spacing(-0.25)}px ${spacing(0.5)}px rgba(0, 0, 0, 0.25)`
    },
    animation: {
        basic: {
            duration: 500,
            useNativeDriver: true
        },
        elastic: {
            duration: 500,
            easing: Easing.elastic(1),
            useNativeDriver: true
        },
        keyboard: {
            duration: 100,
            useNativeDriver: false
        }
    },
    breakpoints: createBreakpoints()
};
