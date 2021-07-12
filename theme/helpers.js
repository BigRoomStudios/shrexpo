const Color = require('color');
const Assert = require('../utils/assert');
const { BASE_SCALING_FACTOR, BREAKPOINTS } = require('./constants');

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

        const regex = /^color-(?<color>\w+)-(?<transparent>\w+-)?(?<shade>\d{3})/;

        Assert(regex.test(key), `Expected ${key} to match regex ${regex}`);

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
        Assert(!isNaN(args[0]), `Expected '${args[0]}' to be a number`);
        return parseInt(args[0], 10) * BASE_SCALING_FACTOR;
    }

    const argToValue = (a) => {

        Assert(a === 'auto' || !isNaN(a), `Expected '${a}' to be a number or 'auto'`);
        return a === 'auto' ? a : `${parseInt(a, 10) * BASE_SCALING_FACTOR}px`;
    };

    return args.map(argToValue).join(' ');
};

exports.createBreakpoints = (custom) => {

    const breakpoints = { ...BREAKPOINTS, ...custom };

    const assert = (...args) => {

        const res = args.pop();

        args.forEach((arg) => Assert(arg in breakpoints, `'${arg}' is not a valid breakpoint`));

        return res;
    };

    return {
        up: (bp) => assert(bp, `@media (min-width:${breakpoints[bp] - 1}px)`),
        down: (bp) => assert(bp, `@media (max-width:${breakpoints[bp]}px)`),
        only: (bp) => assert(bp, `@media (min-width:${breakpoints[bp] - 1}px) and (max-width:${breakpoints[bp]}px)`),
        between: (max, min) => assert(max, min, `@media (max-width: ${breakpoints[max]}px) and (min-width: ${breakpoints[min] - 1}px)`)
    };
};
