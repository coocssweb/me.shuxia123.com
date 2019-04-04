import tip from './modules/tip';
import toast from './modules/tip';
import statistics from './modules/statistics';
import proxy from './modules/proxy';
import router from './modules/router';

const LIFE_CIRCLE = ['beforeCreate', 'create'];

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
    // 统计
    App.prototype.$statistics = statistics;
    // tip
    App.prototype.$tip = tip;
    // toast
    App.prototype.$toast = toast;
    // router
    App.prototype.$router = router;
    // route
    App.prototype$route = {
        url: '',
        host: '',
        query: {},
        path: ''
    };

    /**
     * App命名周期相关
     * ['beforeCreate', 'create']
     */
    App.prototype.beforeCreate = function () {

    };

    App.prototype.create = function () {
        if (this.bindEvent) {
            this.bindEvent();
        }

        if (this.init) {
            this.init();
        }

        if (this.watchs) {
            for (let key in this.watchs) {
                // this.xxx => this.watchs.xxx
                Object.defineProperty(this, key, {
                    get () {
                        return this.watchs[key]
                    },
                    set (value) {
                        this.watchs[key] = value;
                    }
                });
                // 注册监听，this.xxx = value => this.xxxxUpdate
                proxy(this.watchs, key, this[`${key}Update`]);
            }
        }
    };
};

// 定义App.use
function initUse (App) {
    // installedPlugins，已安装的插件
    const installedPlugins = [];
    App.use = function (plugin, ...args) {
        if (installedPlugins.indexOf(plugin) > -1) {
            return false;
        }
        plugin.install.apply(plugin, [this, ...args]);
        return this;
    };
}

// 继承
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

init(App);
initEvents(App);
initUse(App);
initExtend(App);

export default App;
