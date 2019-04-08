import tip from '@modules/tip';
import toast from '@modules/toast';
import statistics from '@modules/statistics';
import proxy from '@modules/proxy';
import router from '@modules/router';
import Share from '@modules/share';
import Uri from '@utils/uri';

function extend (destination, source) {
    for (let key in source) {
        if (source.hasOwnProperty(key)) {
            destination[key] = source[key];
        }
    }
    return destination;
}

function App (options) {
    this._init(options);
}

// App 原型链注册，通用事件
function initEvents (App) {
    // 统计
    App.prototype.$statistics = statistics;
    // tip
    App.prototype.$tip = tip;
    // toast
    App.prototype.$toast = toast;
    // router
    App.prototype.$router = router;
    // route
    App.prototype.$route = Uri.parse(window.location.href);

    App.prototype.create = function () {
        if (this.bindEvent) {
            this.bindEvent();
        }

        if (this.init) {
            this.init();
        }

        if (this.watch) {
            for (let key in this.watchs) {
                Object.defineProperty(this, key, {
                    get () {
                        return this.watch[key];
                    },
                    set (value) {
                        this.watch[key] = value;
                    }
                });
                proxy(this.watch, key, this[`${key}Update`]);
            }
        }
    };
};

function init (App) {
    App.prototype._init = function (options) {
        this.$options = options || this.$options;
        // 配置分享信息
        if (this.$options.shareConfig) {
            this.$share = new Share(this.$options.shareInfo);
        }
        this.create();
    };
}

// 定义App.use
function initUse (App) {
    const installedPlugins = [];
    App.use = function (plugin, ...args) {
        if (installedPlugins.indexOf(plugin) > -1) {
            return false;
        }
        /* eslint-disable */
        plugin.install.apply(plugin, [this, ...args]);
        return this;
    };
}

// 继承
function initExtend (App) {
    App.extend = function (...args) {
        const Super = this;

        const Sub = function (options) {
            this._init(options);
        };

        Sub.prototype = Object.create(Super.prototype);
        Sub.prototype.constructor = Sub;

        [...args].map((item) => {
            extend(
                Sub.prototype,
                item || {}
            );
        });

        Sub['super'] = Super;
        return Sub;
    };
}

init(App);
initEvents(App);
initUse(App);
initExtend(App);

export default App;
