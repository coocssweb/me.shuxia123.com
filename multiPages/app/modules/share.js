/**
 * 分享模块
 * Created by 王佳欣 on 2018/4/15.
 */
import {loadJs} from '../utils';
import Is from '../utils/is';
import {formatShareUrl} from '../utils/uri';

class Share {
    constructor ({
        tokenUrl,
        tokenType = 'json',
        jsSdk = '//res.wx.qq.com/open/js/jweixin-1.2.0.js',
        qqId
    }) {
        this.tokenUrl = tokenUrl;
        this.jsSdk = jsSdk;
        this.qqapi = `//open.mobile.qq.com/sdk/qqapi.js?_bid=${qqId}`;
        this.tokenType = tokenType;
        this.shareConfig = {
            link: '',
            title: '',
            desc: '',
            imgUrl: ''
        };
        this.trigger = null;
        this.success = null;
        this.fail = null;
        this.cancel = null;

        this.$body = $('body');
    }

    callShare () {
        // 平台：QQ // QZone
        if (Is.isQZone() || Is.isQQ()) {
            window._mqq.ui.showShareMenu();
            return false;
        }
        // 平台：微博 / 微信，提示蒙层
        if (Is.isWeibo() || Is.isWechat()) {
            this.$body.append(`<div class="globalShare globalShare——social"></div>`);
            return false;
        }

        // 平台：浏览器
        this.$body.append(`<div class="globalShare globalShare——browser"></div><div class="globalShare-content">
                <div class="globalShare-title"># 分享到 #</div>
                <div class="globalShare-list">
                    <a 
                        class="globalShare-item" 
                        target="_share" 
                        href="${encodeURI(`http://v.t.sina.com.cn/share/share.php?url=${this.shareConfig.link}&title=${this.shareConfig.title}/${this.shareConfig.desc}&charset=utf-8&pic=${this.shareConfig.imgUrl}`)}&searchPic=true">
                        <span class="globalShare-icon globalShare-icon——weibo"></span>
                        <span class="globalShare-name">微博</span>
                    </a>
                    <a 
                        class="globalShare-item" 
                        target="_share" 
                        href="${encodeURI(`http://sns.qzone.qq.com/cgi-bin/qzshare/cgi_qzshare_onekey?url=${this.shareConfig.link}&title=${this.shareConfig.title}&desc=${this.shareConfig.desc}&charset=utf-8&pics=${this.shareConfig.imgUrl}&site=${this.shareConfig.link}&otype=share`)}">
                        <span class="globalShare-icon globalShare-icon——qqzone"></span>
                        <span class="globalShare-name">QQ空间</span>
                    </a>
                    <a 
                        class="globalShare-item" 
                        target="_share" 
                        href="${encodeURI(`http://widget.renren.com/dialog/share?resourceUrl=${this.shareConfig.link}&title=${this.shareConfig.title}&description=${this.shareConfig.desc}&charset=utf-8&pic=${this.shareConfig.imgUrl}`)}">
                        <span class="globalShare-icon globalShare-icon——renren"></span>
                        <span class="globalShare-name">人人网</span>
                    </a>
                </div>
                <a href="javascript:;" class="globalShare-cancel">取消</a>
            </div>`);
    }

    previewImage (urls, currentIndex) {
        window._wx.previewImage({
            urls,
            current: urls[currentIndex]
        });
    }

    downLoadImage () {

    }

    closeWindow () {
        window._wx.closeWindow();
    }

    chooseWXPay ({timestamp, nonceStr, packageStr, signType, paySign}) {
        window._wx.chooseWXPay({
            timestamp,
            nonceStr,
            package: packageStr,
            signType,
            paySign
        });
    }

    config ({appId, timestamp, nonceStr, signature}) {
        /* eslint-disable */
        window._wx.config({
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

    _bindEvent () {
        if (window._bind) {
            return false;
        }

        /* eslint-disable */
        window._bind = true;

        this.$body.on('click', '.globalShare, .globalShare-cancel', () => {
            $('.globalShare').addClass('out').on('animationend webkitAnimationEnd oAnimationEnd', function () {
                $(this).remove();
            });
            $('.globalShare-content').addClass('out').on('animationend webkitAnimationEnd oAnimationEnd', function () {
                $(this).remove();
            });

            this.cancel && this.cancel();
        });

        this.$body.on('click', '.globalShare-item', () => {
            $('.globalShare').remove();
            $('.globalShare-content').remove();
            this.success && this.success();
        });
    }
    // QQ分享
    _initQQ () {
        const setQQShare = () => {
            let {title, desc, link, imgUrl} = this.shareConfig;

            if (this.success) {
                window._mqq.ui.setOnShareHandler((type) => {
                    title = type === 3 ?  desc : title;
                    window._mqq.ui.shareMessage({
                        title,
                        desc,
                        share_type: type,
                        share_url: link,
                        image_url: imgUrl,
                        back: true
                    }, (result) => {
                        if (result.retCode === 0) {
                            this.success && this.success();
                        } else if (result.retCode === 1) {
                            this.fail && this.fail();
                        }
                    });
                });
            } else {
                window._mqq.data.setShareInfo({
                    title,
                    desc,
                    share_url: link,
                    image_url: imgUrl,
                });
            }
        };

        if (window._mqq) {
            setQQShare();
            return false;
        }

        loadJs (this.qqapi).then(() => {
            window._mqq = mqq;
            setQQShare();
        });
    }
    // 微信分享
    _initWechat () {
	    let that = this;
        const setWechatShare = () => {
            const PLATS = ['onMenuShareTimeline', 'onMenuShareAppMessage', 'onMenuShareQQ', 'onMenuShareWeibo', 'onMenuShareQZone'];

            /* eslint-disable */
            window._wx.error(function (error) {
                console.log(error);
            });

            let {title, desc, link, imgUrl} = this.shareConfig;

            window._wx.ready(function () {
                PLATS.map((plat) => {
                    window._wx[plat]({
                        title,
                        desc,
                        link: formatShareUrl(link),
                        imgUrl,
                        trigger (e) {
                            that.trigger && that.trigger();
                        },
                        success(e) {
                            that.success && that.success();
                        },
                        fail() {
                            that.fail && that.fail();
                        },
                        cancel() {
                            that.cancel && that.cancel();
                        }
                    });
                });
            });
        };

        if (window._wx) {
            setWechatShare();
            return false;
        }

        // 加载微信JsSdk
        loadJs (this.jsSdk).then(() => {
            window._wx = wx;
            return $.ajax({
                url: this.tokenUrl,
                dataType: this.tokenType,
                type: 'get',
                data: {
                    url: location.href.split('#')[0],
                    t: new Date().getTime()
                },
                responseType: 'json',
                async: true,
                xhrFields: {withCredentials: true},
            }).then(response => {
                let {appId, timestamp, nonceStr, signature} = response;
                this.config({appId, timestamp, nonceStr, signature});
                setWechatShare();
            });
        });
    }
    // 设置分享信息
    setShare (config) {
        this._bindEvent();
        this.shareConfig = {
            link: config.link || '',
            title: config.title || '',
            desc: config.desc || '',
            imgUrl: config.imgUrl || ''
        };

        this.trigger = config.trigger;
        this.success = config.success;
        this.fail = config.fail;
        this.cancel = config.cancel;

        Is.isWechat() && this._initWechat();
        Is.isQQ() && this._initQQ();
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
