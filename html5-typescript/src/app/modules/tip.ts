/**
 * @file utils/tip.ts 提示模块
 * @author: 王佳欣
 * @email: 1974740999@qq.com
 */

import {EMPTY_FUNCTION} from '../../constant';
import { getTransitionEvent } from '@utils/device';

export default class Tip {
    private $dom: HTMLElement;
    private transitionEvent: string;
    
    constructor (message: string, duration: number = 3000, callback: Function = EMPTY_FUNCTION) {
        this.$dom = document.createElement('div');
        this.$dom.classList.add('globalTip');
        this.$dom.append(`<div class="globalTip-content">${message}</div>`);
        document.body.appendChild(this.$dom);

        this.transitionEvent = getTransitionEvent();
        this.bindEvents();

        setTimeout(() => {
            this.$dom.classList.add('globalTip--out');
        }, duration);
    }

    private bindEvents () {
        this.$dom.addEventListener(this.transitionEvent, this.handleDestory);
    }

    private unbindEvents () {
        this.$dom.removeEventListener(this.transitionEvent, this.handleDestory); 
    }

    private handleDestory () {
        if (this.$dom.classList.contains('globalTip--out')) {
            this.unbindEvents();
            // remove dom
            document.body.removeChild(this.$dom);
        }
    }
}
