const EvaTheme = require('./eva');
const { Color, paletteFromTheme, spacing, createBreakpoints } = require('./helpers');

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
        ...paletteFromTheme(EvaTheme)
    },
    typography: {
        primary: 'OpenSans_400Regular'
    },
    breakpoints: createBreakpoints()
};
