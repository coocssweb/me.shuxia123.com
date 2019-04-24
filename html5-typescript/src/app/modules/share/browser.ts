/**
 * @file app/modules/browser.ts browser
 * @author: 王佳欣
 * @email: 1974740999@qq.com
 */

import { getTransitionEvent } from '@utils/device';
import Share from './share';

export default class Browser extends Share {
    private $domShare: HTMLElement;
    private transitionEvent: string;

    constructor () {
        super();
        this.transitionEvent = getTransitionEvent();
    }

    public setShareInfo () {

    }

    public callShare () {
        // create dom
        this.$domShare = document.createElement('div');
        this.$domShare.classList.add('globalShare');
        this.$domShare.classList.add('globalShare—browser');
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
}