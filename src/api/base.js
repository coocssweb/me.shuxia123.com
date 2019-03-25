import 'whatwg-fetch';
class Base {
    request ({ path, data = {}, method = 'GET', requireLogin, needDelay = false }) {
        const headers = {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        };

        let settings = {
            method,
            headers,
            mode: 'cors'
        };

        let requestUrl = `${process.env.API}${path}`;

        let timestamp = Date.now();

        return new Promise((resolve, reject) => {
            fetch(requestUrl, settings).then((response) => {
                const timediff = Date.now() - timestamp;
                // 延时
                if (timediff < 300 && needDelay) {
                    setTimeout(() => {
                        resolve(response.json());
                    }, 300 - timediff);
                } else {
                    return resolve(response.json());
                }
            }).catch((error) => {
                reject(error);
            });
        });
    }
}

export default Base;