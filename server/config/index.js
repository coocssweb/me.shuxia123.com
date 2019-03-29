export default {
    // 正式环境
    production: {
        host: 'www.shuxia123.com',
        assets: '//assets.shuxia123.com',
        watch: false,
        noCache: false
    },
    // 测试环境
    test: {
        host: 'test.shuxia123.com',
        watch: true,
        noCache: true
    },
    // 开发环境
    development: {
        host: 'http://localhost:4322',
        assets: '//localhost:4322',
        watch: true,
        noCache: true
    }
}['production'];
