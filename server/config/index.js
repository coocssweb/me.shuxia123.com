export default {
    // 正式环境
    production: {
        host: 'mall.meitu.com',
        watch: false,
        noCache: false
    },
    // 测试环境
    test: {
        host: 'testmall.meitu.com',
        watch: true,
        noCache: true
    },
    // 开发环境
    development: {
        host: 'localmall.meitu.com',
        watch: true,
        noCache: true
    }
}[process.env.NODE_ENV];
