const Color = require('color');
const Assert = require('../utils/assert');

exports.Color = class {
    constructor(shades) {

        if (typeof shades === 'string') {
            this['500'] = shades;
            return;
        }

        Object.keys(shades).forEach((shade) => (this[shade] = shades[shade]));
    }

    shade(shade) {

        return this[shade];
    }

    alter(shade) {

        Assert(typeof this[shade] === 'string', 'You must specify a valid shade');

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
