<h1 align="center">mpa-typescript</h1>
这是一个基于webpack4.0 的前端工程，
## Install

```bash
# install my cli tool
npm install -g @coocss/cli

# create a project
coocss create html5

# npm install
cd html5
npm install

# now you can start
npm start
```

<h2 align="center">Features</h2>

✔︎ 可配置多环境，开发环境、测试环境、预生产环境、生产环境等
✔︎ 可自定义配置多入口，简易配置，入口和入口间相互独立
✔︎ 拥有许多通用模块，让你从繁杂的网页开发中跳出来
✔︎ 基于Typescript实现，让你的Javascript代码更好维护
✔︎ 无第三方依赖，代码体积小，如果你需要其他依赖可自行引入
✔︎ 支持响应式开发

## 目录说明
```bash
    ├──build/                       * webpack 工程化代码
    ├──config/                      * 配置文件目录，在这里可以自定义配置多个环境，多个入口文件
    ├──src/                         * 项目代码目录
    ├──├──app/                      * app实现
    ├──├──├──modules/               * 通用模块
    ├──├──assets/                   * 前端资源文件
    ├──├──layout/                   * 基于Ejs的模板文件
    ├──├──pages/                    * 业务代码目录
    ├──├──utis/                     * 工具类
    ├──├──constant.ts               * 通用常量
    ├──├──interface.ts              * typescript 通用接口文件
```

## 多开发环境配置
在 /config/index.js 文件内，可添加修改项目的环境，目前已配置development、test、production三个环境。
在build目录下简历对应的webpack环境目录，并在ppackage.json配置对应构建命令即可。可参考test、production的配置。
```js
# 节点配置说明
name: {                                 // 环境名称，如production
    devtool: false,                     // 是否使用devtool
    NODE_ENV: 'production',             // 全局 NODE_ENV 变量
    HOST: 'www.website.com',            // 该环境对应的host
    API: 'www.website.com/api',         // 该环境对应的api
    jsSourceMap: false,                 // 是否使用sourcemap
    cssSourceMap: false,                // 是否使用sourcemap
    eslint: false,                      // 是否使用eslint
    filePath: '',                       // 构建后资源的目录
    staticPath: '',                     // 静态资源资源的CDN路径，如：//cdn.website.com
    imgPath: '',                        // 图片资源的CDN路径，如：//img.website.com
    filenameHash: true,                 // 构建后的文件，是否使用hash的形式
},
```
## 多入口文件配置
在/config/pages.js文件内，可以添加多入口文件，具体如下，可参照home文件进行配置
```js
{
    name: 'home',                                               // 入口名称
    path: resolve('src/pages', 'home/index.ts'),                // 入口文件路径
    filename: 'index.html',                                     // 构建后的名称，支持目录如：onezero/index.html
    template: resolve('src/pages', 'home/index-render.js')      // 文件模板
},
```
## 模块支持
** 创建一个app **
```js
new App({
    data: {
        // 这里设定的属性，可以通过this.xxx直接操作
    },
    watchs: {
        // 这里设定的属性，会进行监听，可以通过this.xxx直接操作，如果修改，会触发this.xxxHandler，可以在xxxHandler
    },
    bindEvents () {
        // 这里可以进行一些时间绑定
    },
    init () {
        // 这是程序的入口  
    }
});
```

** tip 的使用 **
```js 
this.$tip({
    message: '这是一个提示框',              // 提示信息
    closable: true,                      // 是否可主动关闭
    duration: 0,                         // 自动关闭时间，0不自动关闭
    callback: () => {                    // 关闭后回调
        console.log('提示框关闭后');
    }
});
```

** confirm 的使用 **
```js 

this.$confirm({
    title: '标题',                                              // 标题
    okLabel: '确定',                                            // 确认按钮，空则不显示，默认值: 确定
    cancelLabel: '取消‘,                                        // 取消按钮，空则不显示，默认值: 取消
    content: '内容',                                            // 内容
    okCallback: () => {                                        // 确定按钮回调，支持async、promise，可不传
        console.log(`click ok at:`, Date.now());
        // support callback for async
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve();
                console.log('close dialog at:', Date.now());
            }, 2000);
        });
    },
    cancelCallback,                                             // 取消按钮回调，可不传
});
```

** 当前路由信息 **
```js
console.log(this.$route);
// {"hostname":"127.0.0.1","port":9000,"path":"","query":{"id":"10","action":"justdoit"}}
```

** router路由方法 **
```js
this.$router.push('/page.html');
this.$router.repace('/page.html');
this.$router.goBack();
this.$router.reload();
```

** share组件 **
```js
// 分享信息
const shareInfo = {
    title: '测试分享标题',
    desc: '测试分享描述',
    link: 'http://www.shuxia123.com',
    imgUrl: 'http://assets.shuxia123.com/uploads/2019/1554004957941_width_748_height_500.jpg'
};
this.share = new Share(微信分享的token请求Url, QQ分享的Appid, shareInfo);
// 调用分析
this.share.callShare();
```

** ajax、jsonp **
```js
    this.$ajax(...).then();
    this.$jsonp(...).then();
```