export default (images) => {
    let hasLoadCount = 0;
    return new Promise((resolve, reject) => {
        const load = (src) => {
            let image = new Image();
            image.onload = function (status) {
                hasLoadCount++;
                if (hasLoadCount === images.length) {
                    resolve();
                }
            };
            image.onerror = function (e) {
                hasLoadCount++;
                if (hasLoadCount === images.length) {
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
