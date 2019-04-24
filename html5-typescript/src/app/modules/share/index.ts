/**
 * @file app/share/index.ts share
 * @author: 王佳欣
 * @email: 1974740999@qq.com
 */
import { ShareInfo } from '../../../interface';
import Wechat from './wechat';
import QQ from './qq';
import Browser from './browser';
import IS from '@utils/is';
import Share from './share';
const _is = IS();

const defaultShareInfo: ShareInfo = {
    title: document.title,
    desc: '',
    link: window.location.href,
    imgUrl: ''
};

export default class Index {
    private shareInfo: ShareInfo;
    private platform: Share;

    constructor (tokenUrl?: string, appId?: string, shareInfo?: ShareInfo) {
        shareInfo = { ...shareInfo, ...defaultShareInfo };
        
        if (_is.isWechat) {
            this.platform = new Wechat(tokenUrl, shareInfo);
        } 
        else if (_is.isQQ) {
            this.platform = new QQ(appId, shareInfo);
        } 
        else {
            this.platform = new Browser();
        }
    }

    public setShareInfo (shareInfo: ShareInfo) {
        shareInfo = { ...shareInfo, ...defaultShareInfo };
        this.platform.setShareInfo(shareInfo);
    }

    public callShare () {
        this.platform.callShare();
    }
}