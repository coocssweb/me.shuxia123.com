/**
 * @file app/modules/wechat.ts wechat
 * @author: 王佳欣
 * @email: 1974740999@qq.com
 */

import { ShareInfo } from '../../../interface';
import { getTransitionEvent } from '@utils/device';
import { loadScript } from '@utils/index';
import { ajax as Ajax } from '../ajax';
import Share from './share';

// window property
declare global {
    interface Window {
        __wx__: any
    }
};

export default class WeChat extends Share {
    private $domShare: HTMLElement;
    private wechat: any;
    private shareInfo: ShareInfo;
    private transitionEvent: string;

    constructor (tokenUrl: string, shareInfo: ShareInfo) {
        super();
        this.shareInfo = shareInfo;
        this.transitionEvent = getTransitionEvent();
        this.handleLoadScript(tokenUrl);
    }

    private handleLoadScript (tokenUrl: string): any {
        // load wechat sdk
        loadScript ('//res.wx.qq.com/open/js/jweixin-1.2.0.js').then(() => {
            this.wechat = window.__wx__;
            // request wechat token, then set share info
            Ajax({
                url: tokenUrl,
                dataType: 'json',
                data: {
                    url: location.href,
                    t: new Date().getTime()
                },
                xhrFields: {withCredentials: true},
            }).then((response: any) => {
                let {appId, timestamp, nonceStr, signature} = response;
                this.setConfig({appId, timestamp, nonceStr, signature});
                this.setShareInfo(this.shareInfo);
            });
        });
    }

    private setConfig ({appId, timestamp, nonceStr, signature}): void {
        this.wechat.config({
            debug: false,
            appId,
            timestamp,
            nonceStr,
            signature,
            jsApiList: ['onMenuShareTimeline', 'onMenuShareAppMessage', 'onMenuShareQQ',
            'onMenuShareWeibo','onMenuShareQZone','closeWindow','getLocation',
            'openLocation', 'getLocation', 'chooseImage', 'previewImage', 'downloadImage']
        });
    }

    public setShareInfo (shareInfo: ShareInfo): void {
        this.wechat.error(function (error: any) {
            console.log(error);
        });

        this.wechat.ready(function () {
            ['onMenuShareTimeline', 'onMenuShareAppMessage', 'onMenuShareQQ',
            'onMenuShareWeibo', 'onMenuShareQZone'].map((platItem) => {
                this.wechat[platItem]({
                    ... shareInfo,
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

    public previewImage (images, currentIndex): void {
        this.wechat.previewImage({
            images,
            current: images[currentIndex]
        });
    }

    public closeWindow (): void {
        this.wechat.closeWindow();
    }

    public callShare () {
        // create dom
        this.$domShare = document.createElement('div');
        this.$domShare.classList.add('globalShare');
        this.$domShare.classList.add('globalShare—wechat');
        document.body.appendChild(this.$domShare);
        this.bindEvents();
    }

    private bindEvents () {
        this.$domShare.addEventListener('click', this.handleOut);
        this.$domShare.addEventListener(this.transitionEvent, this.handleDestory);
    }

    private unbindEvents () {
        this.$domShare.removeEventListener('click', this.handleOut);
        this.$domShare.removeEventListener(this.transitionEvent, this.handleDestory);
    }

    private handleOut () {
        this.$domShare.classList.add('globalShare—-out');
    }

    private handleDestory () {
        if (this.$domShare.classList.contains('globalShare—--out')) {
            this.unbindEvents();
            // remove dom
            document.body.removeChild(this.$domShare);
        }
    }
};
