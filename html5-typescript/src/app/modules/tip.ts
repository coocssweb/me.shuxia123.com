/**
 * @file utils/tip.ts 提示模块
 * @author: 王佳欣
 * @email: 1974740999@qq.com
 */

import {EMPTY_FUNCTION} from '../../constant';
import { getTransitionEvent } from '@utils/device';
import { TipOptions } from 'interface';

export default class Tip {
    private $dom: HTMLElement;
    private $domClosable: HTMLElement;
    private transitionEvent: string;
    private timeId: any;
    static defaultOptions: TipOptions = {
        message: '',
        duration: 3000,
        theme: 'default',
        closable: false,
        callback: EMPTY_FUNCTION
    };
    
    constructor (options: TipOptions) {
        options = { ...Tip.defaultOptions, ...options };
        this.$dom = document.createElement('div');
        this.$dom.classList.add('globalTip');
        this.$dom.classList.add(`globalTip--${options.theme}`);

        // create content dom
        const $domContent = document.createElement('div');
        $domContent.classList.add('globalTip-content');
        $domContent.innerHTML = options.message;
        this.$dom.append($domContent);

        // create close dom
        if (options.closable) {
            this.$dom.classList.add('globalTip--closable');
            this.$domClosable = document.createElement('i');
            this.$domClosable.classList.add('globalTip-close');
            $domContent.append(this.$domClosable);
        }
        
        document.body.appendChild(this.$dom);

        // rebind 
        this.transitionEndHandler = this.transitionEndHandler.bind(this);
        this.handleDestory = this.handleDestory.bind(this);
        this.transitionEvent = getTransitionEvent();
        this.bindEvents();

        if (options.duration) {
            this.timeId = setTimeout(() => {
                this.handleDestory();
            }, options.duration);
        }
    }

    private bindEvents () {
        this.$dom.addEventListener(this.transitionEvent, this.transitionEndHandler);
        if (this.$domClosable) {
            this.$domClosable.addEventListener('click', this.handleDestory);
        }
    }

    private unbindEvents () {
        this.$dom.removeEventListener(this.transitionEvent, this.transitionEndHandler);
        if (this.$domClosable) {
            this.$domClosable.removeEventListener('click', this.handleDestory);
        }
    }

    private transitionEndHandler (e: any) {
        if (e.target === e.currentTarget) {
            this.handleDestory();
        }
    }

    private handleDestory () {
        // clear timer
        if (this.timeId) {
            clearTimeout(this.timeId);
            this.timeId = null;
        }

        if (this.$dom.classList.contains('doOut')) {
            this.unbindEvents();
            
            // remove dom
            document.body.removeChild(this.$dom);
        } else {
            this.$dom.classList.add('doOut');
        }
    }
}
