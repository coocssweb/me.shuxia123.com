/**
 * App
 * Created by 王佳欣 on 2018/4/14.
 */
const LIFE_CIRCLE = ['beforeCreate', 'create', 'close', 'open'];

function _mixin (destination, source) {
    for (let key in source) {
        if (source.hasOwnProperty(key)) {
            destination[key] = source[key];
        }
    }
    return destination;
}

function _combine (destination, source) {
    for (let key in source) {
        if (source.hasOwnProperty(key) && LIFE_CIRCLE.indexOf(key) === -1) {
            destination.prototype[key] = source[key];
        }
    }

    LIFE_CIRCLE.map((key) => {
        if (source.hasOwnProperty(key)) {
            destination.prototype[key] = [destination.prototype[key], source[key]];
        }
    });

    return destination;
}

function App (options) {
    this.$options = options || this.$options;
    this.beforeCreate();
    this.create();
}

// App 原型链注册，通用事件
function initEvents (App) {
    /* eslint-disable */
    // cnzz 统计
    App.prototype.$cnzz = {
        event ({dom, event}) {
            _czc.push(['_trackEvent', dom, event]);
        },
        page ({page}) {
            _czc.push(['_trackPageview', page]);
        }
    };

    // 百度统计
    App.prototype.$baidu = {
        event ({dom, event}) {

        },
        page ({page}) {

        }
    };

    // tip提示框
    App.prototype.$tip = function ({message, type}) {
        $('body').append(`<div class="globalTip"><div class="globalTip-inner">${message}</div></div>`);
        $('.globalTip').addClass('show').on('animationend webkitAnimationEnd oAnimationEnd', function () {
            $(this).remove();
        });
    };

    // toast消息
    App.prototype.$toast = {
        open ({type, message, timeout}) {
            $('body').append(`<div class="globalToast">
            <div class="globalToast-mask"></div>
            <div class="globalToast-box">
                <i class='globalToast-icon ${type === 'loading' ? 'weui-loading' : `weui-icon-${type}`}'></i>
                <p class="globalToast-content">${message}</p>
            </div>
        </div>`);

            if (!timeout) {
                return;
            }

            setTimeout(() => {
                this.close();
            }, timeout);
        },
        close () {
            $('.globalToast').addClass('out').on('animationend webkitAnimationEnd oAnimationEnd', function () {
                $(this).remove();
            });
        }
    };

    /**
     * App命名周期相关
     * ['beforeCreate', 'create', 'close', 'open']
     */
    App.prototype.open = function () {
        if (this.$element && this.$element.page) {
            his.$element.page
                .addClass('animating')
                .addClass('open')
                .on('animationend webkitAnimationEnd oAnimationEnd', function () {
                    $(this).addClass('show').removeClass('animating').removeClass('open');
                });
        }
    };

    App.prototype.close = function () {
        if (this.$element && this.$element.page) {
            this.$element.page
                .addClass('animating')
                .addClass('close')
                .on('animationend webkitAnimationEnd oAnimationEnd', function () {
                    $(this).removeClass('show').removeClass('animating').removeClass('close');
                });
        }
    };

    App.prototype.beforeCreate = function () {

    };

    App.prototype.create = function () {
        if (this.bindEvent) {
            this.bindEvent();
        }
        this.open();
    };
};

// 定义App.use
function initUse (App) {
    // installedPlugins，已安装的插件
    const installedPlugins = [];
    App.use = function (plugin) {
        if (installedPlugins.indexOf(plugin) > -1) {
            return false;
        }

        const args = Array.from(arguments).slice(1);
        args.unshift(this);
        plugin.install.apply(plugin, args);

        return this;
    };
}

function initExtend (App) {
    App.extend = function (extendOptions) {
        extendOptions = extendOptions || {};
        const Super = this;

        const Sub = function (options) {
            LIFE_CIRCLE.map((key) => {
                if (this[key] instanceof Array) {
                    let tempArray = [].concat(this[key]);
                    this[key] = function () {
                        for (let index = 0; index < tempArray.length; index++) {
                            tempArray[index].call(this);
                        }
                    };
                }
            });
            this._init(options);
        };

        Sub.prototype = Object.create(Super.prototype);
        Sub.prototype.constructor = Sub;

        _combine(
            Sub,
            extendOptions
        );

        Sub['super'] = Super;
        return Sub;
    };
}

function initMixin (App) {
    App.mixin = function (mixin) {
        _mixin(
            App.prototype,
            mixin
        );
    };
}

init(App);
initEvents(App);
initUse(App);
initExtend(App);
initMixin(App);

export default App;
