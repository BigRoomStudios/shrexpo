const Color = require('color');
const Assert = require('../utils/assert');
const { BASE_SCALING_FACTOR } = require('./constants');

exports.Color = class {
    constructor(shades) {

        if (typeof shades === 'string') {
            this['500'] = shades;
            return;
        }

        Object.keys(shades).forEach((shade) => (this[shade] = shades[shade]));
    }

    alter(shade = 500) {

        return Color(this[shade]);
    }

    toString() {

        return this['500'];
    }
};

exports.paletteFromTheme = (theme) => {

    const colors = Object.keys(theme).reduce((acc, key) => {

        const { color, transparent, shade } = key.match(/^color-(?<color>\w+)-(?<transparent>\w+-)?(?<shade>\d{3})/).groups;

        if (!(color in acc)) {
            acc[color] = { transparent: {} };
        }

        if (transparent) {
            acc[color].transparent[shade] = theme[key];
        }
        else {
            acc[color][shade] = theme[key];
        }

        return acc;
    }, {});

    return Object.keys(colors).reduce((acc, color) => {

        acc[color] = new exports.Color(colors[color]);
        return acc;
    }, {});
};

exports.spacing = (...args) => {

    if (args.length === 1) {
        return args[0] * BASE_SCALING_FACTOR;
    }

    const argToValue = (a) => (isNaN(a) ? a : `${Number(a) * BASE_SCALING_FACTOR}px`);

    return args.map(argToValue).join(' ');
};
