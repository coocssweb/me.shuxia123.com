import { loadImages } from '@utils';
import { getTransitionEvent } from '@utils/device';
import { EMPTY_FUNCTION } from '../../constant';

export default class Loading {
    private haveLoadedPercent: number = 0;
    private haveLoadedCount: number = 0;
    private haveLoaded: boolean = false;
    private haveLoadedHalf: boolean = false;
    private loadedCallback: Function;
    private images: Array<string>;

    // global loading's dom
    private $loadingContainer: HTMLElement;
    private $loadingProgress: HTMLElement;
    private $loadingValue: HTMLElement;
    private transitionEvent: string;

    constructor (images: Array<string>, callback?: Function) {
        this.images = images;
        this.loadedCallback = callback || EMPTY_FUNCTION;
        this.$loadingContainer = document.querySelector('.globalLoading-container');
        this.$loadingProgress = document.querySelector('.globalLoading-progress');
        this.$loadingValue = document.querySelector('.globalLoading-value');
        this.transitionEvent = getTransitionEvent();

        this.bindEvents();
    }

    private bindEvents () {
        this.$loadingContainer.addEventListener(this.transitionEvent, this.handleDestory);
    }

    private handleDestory () {
        this.unbindEvents();
        // remove dom
        this.$loadingContainer.parentNode.removeChild(this.$loadingContainer);
    }

    private unbindEvents () {
        this.$loadingContainer.removeEventListener(this.transitionEvent, this.handleDestory);
    }

    private handleLoadEnd (): void {
        this.$loadingContainer.classList.add('globalOut');
    }

    private setLoadingStatus (): void {
        this.$loadingValue.innerHTML  = `${this.haveLoadedPercent}%`;
        this.$loadingProgress.style.width = `${this.haveLoadedPercent}%`;
    }

    private countDown (timeout: number): void {
        setTimeout(() => {
            this.setLoadingStatus();
            if (this.haveLoadedPercent !== 50 && this.haveLoadedPercent !== 80) {
                this.haveLoadedPercent += 1;
                this.countDown(timeout);
            } else if (this.haveLoadedPercent === 50) {
                // 加载50% 做假暂停
                this.haveLoadedPercent += this.haveLoadedHalf ? 1 : 0;
                this.countDown(timeout);
            } else if (this.haveLoadedPercent === 80) {
                // 加载80% 做假暂停
                this.haveLoadedPercent += this.haveLoaded ? 1 : 0;
                this.countDown(timeout);
            } else if (this.haveLoadedPercent > 99) {
                this.loadedCallback();
                this.handleLoadEnd();
            }
        }, timeout);
    }

    public start (): void {
        this.countDown(50);
        loadImages(this.images, (loadedCount) => {
            this.haveLoadedCount = loadedCount;
            this.haveLoadedHalf = this.haveLoadedCount > this.images.length / 2; 
        }).then(() => {
            this.haveLoaded = true;
        });
    }
};
