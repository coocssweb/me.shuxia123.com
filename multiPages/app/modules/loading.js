/**
 * loading 模块
 * Created by 王佳欣 on 2018/4/3.
 */
import { loadImages } from '@utils';

class Loading {
    constructor (images = [], callback) {
        this.percent = 0;
        this.images = images;
        this.haveLoaded = false;
        this.loadedCallback = callback;
        this.$loadingPercent = $('.globalLoading-percent');
        this.$loadingValue = $('.globalLoading-value');
    }

    /**
     * 资源加载完成
     */
    loadOver () {
        this.haveLoaded = true;
        $('.globalLoading').fadeOut(300);
        this.loadedCallback && this.loadedCallback();
    }

    /**
     * 倒计时
     */
    countdown (timeout) {
        setTimeout(() => {
            this.percent += this.percent > 80 ? (this.haveLoaded ? 1 : 0) : 1;
            if (this.percent > 99) {
                this.loadedCallback();
            } else {
                this.$loadingValue.html(`${this.percent}%`);
                this.$loadingPercent.css('width', `${this.percent}%`);
                this.countdown(this.percent < 80 && !this.haveLoaded ? timeout : 30);
            }
        }, timeout);
    }

    init () {
        this.countdown(50);
        loadImages(this.images).then(() => {
            this.haveLoaded = true;
        });
    }
}

// install
const install = (App, config, callback) => {
    if (install.installed) {
        return false;
    }

    install.installed = true;
    const instance = new Loading(config, callback);
    Object.defineProperty(App.prototype, '$loading', {
        get () {
            return instance;
        }
    });
};

Loading.install = install;

export default Loading;
