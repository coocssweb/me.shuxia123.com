const { resolve } = require('../build/utils');

module.exports = [
    {
        name: 'svg',
        path: resolve('src/pages', 'svg/index.ts'),
        filename: 'svg.html',
        template: resolve('src/pages', 'svg/index-render.js')
    },
    {
        name: 'gesture',
        path: resolve('src/pages', 'gesture/index.ts'),
        filename: 'gesture.html',
        template: resolve('src/pages', 'gesture/index-render.js')
    }
];
