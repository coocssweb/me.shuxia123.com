/**
 * @file compress.ts 图片压缩
 */
import { EMPTY_FUNCTION } from '../../../constant';

export default class Compress {
    static readonly defaultOptions = {
        quality: 1,
        success: EMPTY_FUNCTION
    };

    private image: HTMLImageElement;
    private width: number;
    private height: number;
    private quality: number;
    private options;

    constructor (imagePath: string, options) {
        this.options = { ...Compress.defaultOptions,  ...options };
        this.image = new Image();
        this.loadImage(imagePath);
        this.compress();
    }

    private loadImage (photo: string) {
        const promise = new Promise((resolve, reject) => {
            this.image.onload = () => {
                this.width = this.image.width;
                this.height = this.image.height;
                resolve();
            }
        });
        this.image.src = photo;
        return promise;
    }

    private compress () {
        const canvas = document.createElement('canvas');
        const context = canvas.getContext('2d');
        canvas.width = this.width;
        canvas.height = this.height;
        context.drawImage(this.image, 0, 0, this.width, this.height);
        const base64 = canvas.toDataURL('image/jpeg', this.quality);
        this.options.success(base64);
    }
}
