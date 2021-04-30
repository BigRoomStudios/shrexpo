'use strict';

const BASE_FONT_SIZE = 16;

module.exports = {
    spacing: (em) => `${BASE_FONT_SIZE * em}`,
    palette: {
        BRAND: '#ffd541',
        SLATE: '#f7f7f7',
        ETCH: '#333',
        ACCENT: '#4051ff',
        HINT: '#eee',
        SAFE: '#6fcf97',
        DANGER: '#ff7979',
        NEUTRAL: '#ffdb59',
        INDETERMINATE: '#ccc'
    },
    typography: {
        fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"'
    }
};
