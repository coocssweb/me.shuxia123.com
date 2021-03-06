/**
 * 配置文件
 * 生产环境 production
 * 测试环境 test
 * 开发环境 development
 */

module.exports = {
    // 生产环境
    production: {
        env: 'production',                      // 环境
        api: 'https://www.shuxia123.com/services/', // api 接口地址
        publicPath: '//www.shuxia123.com',// 静态资源地址
        imagePath: '',                          // 图片资源地址
        devtool: 'false',                       // devtool
        noHash: false,
    },
    // 开发环境构建，用于做ssr
    test: {
        env: 'test',                           // 环境
        api: 'http://localhost:4322/services/',          // api 接口地址
        publicPath: 'http://localhost:8089/dist',   // 静态资源地址
        imagePath: '',                          // 图片资源地址
        devtool: 'false',                       // devtool,
        noHash: true,
    },
    // 开发环境
    development: {
        env: 'development',                     // 环境
        api: 'http://localhost:4322/services/',      // api 接口地址
        publicPath: '',                         // 静态资源地址
        imagePath: '',                          // 图片资源地址
        port: '8089',                           // 开发端口
        devtool: 'source-map',                  // devtool
        noHash: true,
    }
};
