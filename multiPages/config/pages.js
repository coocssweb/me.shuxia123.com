const {resolve} = require('../build/utils');

module.exports = [
    {
        name: 'home',
        path: resolve('pages', 'home/index.js'),
        filename: 'index.html',
        template: resolve('pages', 'home/index-render.js')
    },
    {
        name: 'magazines',
        path: resolve('pages', 'magazines/index.js'),
        filename: 'magazines/index.html',
        template: resolve('pages', 'magazines/index-render.js')
    },
    {
        name: 'book',
        path: resolve('pages', 'book/index.js'),
        filename: 'book/index.html',
        template: resolve('pages', 'book/index-render.js')
    }
];
