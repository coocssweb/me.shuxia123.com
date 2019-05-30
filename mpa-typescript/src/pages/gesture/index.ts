import '@scss/gesture.scss';
import App from '@app';
import Container from './container';
import { loadImages } from '@utils/index';

new App({
    data: {
    },
    watchs: {
    },
    bindEvents () {
        window.$('.btn-add').click(() => {
            this.container.add('https://www.shuxia123.com/demos/images/nba.jpg');
        });

        window.touch.on(window.$('.btn-clear'), 'hold', () => {
            this.container.clear();
        });
    },
    init () {
        loadImages(['https://www.shuxia123.com/demos/images/nba.jpg']);
        this.container = new Container(window.$('.bags') ,{ capacity: 5 });
    }
});
