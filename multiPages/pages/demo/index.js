import 'scss/demo.scss';
import Loading from 'appModules/loading';
import Share from 'appModules/share';
import App from 'app';
// 分享模块
App.use(Share, {
        weixinTokenUrl: `${location.protocol}//applet.meitu.com/public/index/wx_token`,
        tokenType: 'jsonp',
        qqAppId: '',
    },
);

App.use(Loading, {
    images: ['https://mtshop1.meitudata.com/5a27dbac402a510658.jpg']
}, () => {
    // loading 完成
});

new (App.extend({
    shareConfig: {
        title: '默认分享标题',
        description: '默认分享文案',
        url: 'http://h4.meitu.com',
        imgUrl: 'http://mtshop1.meitudata.com/5ad08f6044d2038412.png',
    },
    // 全局页面
    $element: {

    },
    data: {

    },
    // 数据监听
    watchs: {

    },
    beforeCreate () {

    },
    create () {

    },
    bindEvent () {

    },
    init () {
        this.loading.init();
    }
}))();