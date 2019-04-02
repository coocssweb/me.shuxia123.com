/**
 * Created by 王佳欣 on 2018/7/6.
 */
const {resolve} = require('../build/utils');
/*
{
    name: 'index',      // 入口文件目录，用于webpack中的name key
    path: '',           // 入口文件目录，用于获取js文件入口
    filename: '',       // 入口文件名称，用于定义构建后的文件名
    template: '',       // 入口文件模板，用户获取模板文件
}
*/

module.exports = [
    {
        name: 'demo',
        path: resolve('pages', 'demo/index.js'),
        filename: 'demo.html',
        template: resolve('pages', 'demo/index-render.js')
    }
];
