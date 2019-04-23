import {loadJs} from '@utils';
import Is from '@utils/is';
/* eslint-disable */
/**
 * 微信分享
 */
class WeChat {
    constructor (tokenUrl,
                 tokenType = 'json',
                 shareInfo
    ) {
        this.load(tokenUrl, tokenType, jsSdk, shareInfo);
        this.$body.append(`<div class="globalShare globalShare-mask——social"></div>`);
        this.$shareMask = $('.globalShare-mask');
    }

    load (tokenUrl, tokenType, shareInfo) {
        // 加载微信JsSdk
        loadJs ('//res.wx.qq.com/open/js/jweixin-1.2.0.js').then(() => {
            this.$weChat = wx;
            return $.ajax({
                url: tokenUrl,
                dataType: tokenType,
                type: 'get',
                data: {
                    url: location.href,
                    t: new Date().getTime()
                },
                responseType: 'json',
                async: true,
                xhrFields: {withCredentials: true},
            }).then(response => {
                let {appId, timestamp, nonceStr, signature} = response;
                this.setConfig({appId, timestamp, nonceStr, signature});
                this.setShare(shareInfo);
            });
        });
    }

    setConfig ({appId, timestamp, nonceStr, signature}) {
        this.$weChat.config({
            debug: false,
            appId,
            timestamp,
            nonceStr,
            signature,
            jsApiList: [
                'onMenuShareTimeline',
                'onMenuShareAppMessage',
                'onMenuShareQQ',
                'onMenuShareWeibo',
                'onMenuShareQZone',
                'closeWindow',
                'getLocation',
                'openLocation',
                'getLocation',
                'chooseImage',
                'previewImage',
                'downloadImage',
            ]
        });
    }

    previewImage (images, currentIndex) {
        this.$weChat.previewImage({
            images,
            current: images[currentIndex]
        });
    }

    closeWindow () {
        this.$weChat.closeWindow();
    }

    setShare (shareInfo = {}) {
        const {title, desc, shareUrl, imgUrl} = shareInfo;

        this.$weChat.error(function (error) {
            console.log(error);
        });
        this.$weChat.ready(function () {
            [
                'onMenuShareTimeline',
                'onMenuShareAppMessage',
                'onMenuShareQQ',
                'onMenuShareWeibo',
                'onMenuShareQZone'
            ].map((platItem) => {
                this.$weixin[platItem]({
                    title,
                    desc,
                    link: shareUrl,
                    imgUrl,
                    trigger (e) {
                    },
                    success(e) {
                    },
                    fail() {
                    },
                    cancel() {
                    }
                });
            });
        });
    }

    callShare () {
        this.$shareMask.addClass('fade-in');
    }
}

/**
 * QQ分享
 */
class QQ {
    constructor (appId, shareInfo) {
        this.loadQQ(appId, shareInfo)
    }

    loadQQ (appId, shareInfo) {
        loadJs (`//open.mobile.qq.com/sdk/qqapi.js?_bid=${appId}`).then(() => {
            this.$QQ = mqq;
            this.setShare(shareInfo);
        });
    }

    setShare (shareInfo = {}) {
        let {title, desc, shareUrl, imgUrl} = shareInfo;

        this.$QQ.data.setShareInfo({
            title,
            desc,
            share_url: shareUrl,
            image_url: imgUrl,
        });
    }

    callShare () {
        this.$QQ.ui.showShareMenu();
    }
}

/**
 * 浏览器分享
 */
class Browser {
    constructor () {
        // 分享按钮绑定
        this.$body.on('click', '.globalShare-item', () => {
            $('.globalShare').remove();
            $('.globalShare-content').remove();
        });
        // 区分微博
        if (Is.isWeibo()) {
            this.$body.append(`<div class="globalShare globalShare-mask——social"></div>`);
        } else {
            $('body').append(`<div class="globalShare-mask globalShare-mask——browser"></div><div class="globalShare-content">
                <div class="globalShare-title"># 分享到 #</div>
                <div class="globalShare-list"></div>
                <a href="javascript:;" class="globalShare-cancel">取消</a>
            </div>`);
        }

        this.$shareList = $('.globalShare-list');
        this.$shareMask = $('.globalShare-mask');
        this.$shareContent = $('.globalShare-content');
    }

    setShare (shareInfo) {
        this.$shareList.append(
            `<a 
                class="globalShare-item" 
                target="_share" 
                href="${encodeURI(`http://v.t.sina.com.cn/share/share.php?url=${shareInfo.shareUrl}&title=${shareInfo.title}/${shareInfo.desc}&charset=utf-8&pic=${shareInfo.imgUrl}`)}&searchPic=true">
                <span class="globalShare-icon globalShare-icon——weibo"></span>
                <span class="globalShare-name">微博</span>
            </a>
            <a 
                class="globalShare-item" 
                target="_share" 
                href="${encodeURI(`http://sns.qzone.qq.com/cgi-bin/qzshare/cgi_qzshare_onekey?url=${shareInfo.shareUrl}&title=${shareInfo.title}&desc=${shareInfo.desc}&charset=utf-8&pics=${shareInfo.imgUrl}&site=${shareInfo.shareUrl}&otype=share`)}">
                <span class="globalShare-icon globalShare-icon——qqzone"></span>
                <span class="globalShare-name">QQ空间</span>
            </a>
            <a 
                class="globalShare-item" 
                target="_share" 
                href="${encodeURI(`http://widget.renren.com/dialog/share?resourceUrl=${shareInfo.shareUrl}&title=${shareInfo.title}&description=${shareInfo.desc}&charset=utf-8&pic=${shareInfo.imgUrl}`)}">
                <span class="globalShare-icon globalShare-icon——renren"></span>
                <span class="globalShare-name">人人网</span>
            </a>`
        );
    }

    callShare () {
        this.$shareMask.addClass('fade-in');
        if (!Is.isWeibo()) {
            this.$shareContent.addClass('fade-in');
        }
    }
}

class Share {
    constructor ({
         tokenUrl,
         tokenType = 'json',
         appId,
         shareInfo = { shareUrl: '', title: '', desc: '', imgUrl: '' }
    }) {
        // 分享工厂
        if (Is.isWechat()) {
            this.$WeChat = new WeChat(tokenUrl, tokenType, shareInfo);
            this.setShare = this.$WeChat.setShare.bind(this);
            this.callShare = this.$WeChat.callShare.bind(this);
        } else if (Is.isQZone() || Is.isQQ()) {
            this.$QQ = new QQ(appId);
            this.setShare = this.$WeChat.setShare.bind(this);
            this.callShare = this.$QQ.callShare.bind(this);
        } else {
            this.$Browser = new Browser();
            this.setShare = this.$Browser.setShare.bind(this);
            this.callShare = this.$Browser.callShare.bind(this);
        }
        this._bindEvent();
    }

    _bindEvent () {
        // 蒙层点击事件
        this.$body.on('click', '.globalShare, .globalShare-cancel', () => {
            $('.globalShare').removeClass('fade-in').addClass('fade-out').on('animationend webkitAnimationEnd oAnimationEnd', function () {
                $(this).removeClass('fade-out');
            });
            $('.globalShare-content').removeClass('fade-in').addClass('out').on('animationend webkitAnimationEnd oAnimationEnd', function () {
                $(this).removeClass('fade-out');
            });
        });
    }
}

// install
const install = (App, config) => {
    if (install.installed) {
        return false;
    }

    install.installed = true;
    const instance = new Share(config);
    Object.defineProperty(App.prototype, '$share', {
        get () {
            return instance;
        }
    });
};

Share.install = install;
export default Share;
