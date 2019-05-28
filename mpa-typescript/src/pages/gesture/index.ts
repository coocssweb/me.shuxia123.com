import '@scss/gesture.scss';
import App from '@app';
import Container from './container';

new App({
    data: {
    },
    watchs: {
    },
    bindEvents () {
        window.$('.btn-add').click(() => {
            this.container.add('https://www.shuxia123.com/images/personal.jpg');
        });


    },
    init () {
        this.container = new Container(window.$('.bags') ,{ capacity: 5 });
    }
});
