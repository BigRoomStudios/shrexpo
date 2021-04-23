const { Color } = require('./helpers');

const BASE_FONT_SIZE = 16;

module.exports = {
    spacing: (m) => BASE_FONT_SIZE * m,
    palette: {
        slate: new Color('#FFFFFF'),
        etch: new Color('#333333'),
        primary: new Color({
            100: '#D6E4FF',
            200: '#ADC8FF',
            300: '#84A9FF',
            400: '#6690FF',
            500: '#3366FF',
            600: '#254EDB',
            700: '#1939B7',
            800: '#102693',
            900: '#091A7A'
        }),
        success: new Color({
            100: '#F5FDCC',
            200: '#E9FB99',
            300: '#D6F465',
            400: '#C1EA3F',
            500: '#A4DD06',
            600: '#87BE04',
            700: '#6D9F03',
            800: '#548001',
            900: '#426A01'
        }),
        info: new Color({
            100: '#D7FEF1',
            200: '#B0FDEB',
            300: '#88FBE9',
            400: '#6AF7ED',
            500: '#3AEFF2',
            600: '#2ABFD0',
            700: '#1D93AE',
            800: '#126B8C',
            900: '#0B4E74'
        }),
        warning: new Color({
            100: '#FFF5D7',
            200: '#FFE7AF',
            300: '#FFD787',
            400: '#FFC769',
            500: '#FFAC38',
            600: '#DB8928',
            700: '#B7691C',
            800: '#934D11',
            900: '#7A380A'
        }),
        danger: new Color({
            100: '#FFE6D6',
            200: '#FFC6AD',
            300: '#FFA083',
            400: '#FF7C65',
            500: '#FF4032',
            600: '#DB2427',
            700: '#B71928',
            800: '#930F27',
            900: '#7A0927'
        })
    },
    typography: {
        primary: 'OpenSans_400Regular'
    }
};
