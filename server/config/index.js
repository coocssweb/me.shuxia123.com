export default {
    // 正式环境
    production: {
        host: 'me.shuxia123.com',
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
        host: 'dev.shuxia123.com',
        watch: true,
        noCache: true
    }
}[process.env.NODE_ENV];
