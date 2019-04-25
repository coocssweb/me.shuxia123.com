import '@scss/home.scss';
import App from '@app';
import Share from '@modules/share/index';
// you can create an other app
// other create a new app, it has independent data and watchs..., 
// if you need create a app just when you need
// you can create it in a function and return it, for example singleton mode.
import './other';

new App({
    data: {
        name: '王佳欣'
    },
    watchs: {
        sex: 'male'
    },
    sexHandler (value: any, oldValue: any) {
        console.log('changed sex from', oldValue, '=>', value);
    },

    handlePageLoading () {

    },

    bindEvents () {
        // demo for tip
        document.querySelector('.btn-tip').addEventListener('click', () => {
            this.$tip({
                message: '这是一个提示框',
                closable: true,
                duration: 0,
                callback: () => {
                    console.log('提示框关闭后');
                }
            });
        });

        // demo for route
        document.querySelector('.btn-log').addEventListener('click', () => {
            console.log('当前路由信息', this.$route);
        });

        // demo for proxy
        document.querySelector('.btn-proxy').addEventListener('click', () => {
            this.sex = this.sex === 'female' ? 'male' : 'female';
        });

        // call a share
        document.querySelector('.btn-share').addEventListener('click', () => {
            this.share.callShare(); 
        });

        // open a new page
        document.querySelector('.btn-open').addEventListener('click', () => {
            this.$router.push('/demo.html');
        });
    },

    init () {
        console.log('index init');
        console.log('this.name => this.data.name, ', this.name);

        // 测试分享模块
        const shareInfo = {
            title: '测试分享标题',
            desc: '测试分享描述',
            link: 'http://www.shuxia123.com',
            imgUrl: 'http://assets.shuxia123.com/uploads/2019/1554004957941_width_748_height_500.jpg'
        };
        this.share = new Share('', null, shareInfo);
    }
});
