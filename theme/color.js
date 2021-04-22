'use strict';

module.exports = class {
    constructor(shades) {

        if (typeof shades === 'string') {
            this['500'] = shades;
        }

        Object.keys(shades).forEach((shade) => {

            this[shade] = shades[shade];
        });
    }

    shade(shade) {

        return this[shade];
    }

    toString() {

        return this['500'];
    }
};
