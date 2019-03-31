import loadImage from './loadImage';
import { formatImage } from './index';

export default () => {
    const images = [...document.querySelectorAll('.detail-photolist img'), ...document.querySelectorAll('.detail-content img')];
    const height = window.innerHeight;
    images.forEach((item) => {
        let top = item.getBoundingClientRect().top;
        let imageHeight = item.getBoundingClientRect().height;

        // 正在加载中、已经在、不在可视区则不加载
        if (item.classList.contains('lazy-loading') || item.classList.contains('lazy-loaded') || top > height || top <= -imageHeight) {
            return false;
        }

        item.classList.add('lazy-loading');
        let imageSrc = formatImage(item.getAttribute('src'));
        loadImage([imageSrc]).then(() => {
            item.setAttribute('src', imageSrc);
            item.classList.remove('lazy-loading');
            item.classList.add('lazy-loaded');
            item.parentNode.classList.add('loaded');
        });
    });
};