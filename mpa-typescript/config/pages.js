const { resolve } = require('../build/utils');

module.exports = [
    {
        name: 'svg',
        path: resolve('src/pages', 'svg/index.ts'),
        filename: 'svg.html',
        template: resolve('src/pages', 'svg/index-render.js')
    }
];
