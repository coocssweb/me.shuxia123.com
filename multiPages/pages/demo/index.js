import '@scss/demo.scss';
import Loading from '@modules/loading';
import App from 'app';
// 分享模块
App.use(Loading, {
    images: ['https://mtshop1.meitudata.com/5a27dbac402a510658.jpg']
}, () => {
        // loading 完成
});

const shareInfo = {
    title: '默认分享标题',
    description: '默认分享文案',
    url: 'http://h4.meitu.com',
    imgUrl: 'http://mtshop1.meitudata.com/5ad08f6044d2038412.png',
};

new (App.extend({
    $element: {
    },
    data: {
    },
    watch: {
    },
    bindEvent () {
    },
    init () {
        console.log('demos');
        console.log(this.$route);
    }
}))({ shareInfo });
