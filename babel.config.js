'use strict';

const Path = require('path');

module.exports = function (api) {

    api.cache(true);
    return {
        presets: ['babel-preset-expo'],
        plugins: [
            [
                'module-resolver',
                {
                    root: ['./'],
                    extensions: [
                        '.ios.ts',
                        '.android.ts',
                        '.ts',
                        '.ios.tsx',
                        '.android.tsx',
                        '.tsx',
                        '.jsx',
                        '.js',
                        '.json',
                        '.otf',
                        '.svg'
                    ],
                    alias: {
                        'middle-end': Path.resolve(__dirname, 'middle-end'),
                        routes: Path.resolve(__dirname, 'routes'),
                        components: Path.resolve(__dirname, 'components'),
                        containers: Path.resolve(__dirname, 'containers'),
                        icons: Path.resolve(__dirname, 'icons'),
                        theme: Path.resolve(__dirname, 'theme')
                    }
                }
            ],
            [
                'babel-plugin-inline-import',
                {
                    'extensions': ['.svg']
                }
            ]
        ]
    };
};
