/**
 * 懒加载Js
 */
export const loadJs = (url) => {
    return new Promise((resolve, reject) => {
        let script = document.createElement('script');
        script.type = 'text/javascript';
        if (script.readyState) {
            script.onreadystatechange = function (e) {
                if (script.readyState === 'loaded' || script.readyState === 'complete') {
                    script.onreadystatechange = null;
                    resolve(e);
                }
            };
        } else {
            script.onload = function (e) {
                resolve(e);
            };
        }
        script.src = url;
        document.getElementsByTagName('head')[0].appendChild(script);
    });
};

/**
 * 懒加载图片
 */
export const loadImage = (images) => {
    let haveLoadedCount = 0;
    return new Promise((resolve, reject) => {
        const load = (src) => {
            let image = new Image();
            image.onload = function (status) {
                haveLoadedCount++;
                if (haveLoadedCount === images.length) {
                    resolve();
                }
            };
            image.onerror = function (e) {
                haveLoadedCount++;
                if (haveLoadedCount === images.length) {
                    resolve();
                }
            };
            image.src = src;
        };

        images.map((item, index) => {
            load(item);
        });

        images.length === 0 && resolve();
    });
};
