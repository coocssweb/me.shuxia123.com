// 字符串化
// return key1=value1&key2=value2
const stringifyQuery = (query) => {
    const res = Object.keys(query).map((key) => {
        return `${key}=${query[key]}`;
    });

    return res.join('&');
};

class URI {
    // 获取 Host
    _parseHost () {
        if (this.url === '') {
            return '';
        }
        const regHost = /\/\/(.*)\.(com|cn|net|cc)/;
        const matchs = this.url.match(regHost);
        if (matchs.length < 3) {
            return '';
        }
        return `${matchs[1]}.${matchs[2]}`;
    }
    // 获取 Path
    _parsePath () {
        if (this.url === '') {
            return '';
        }
        const urlSplits = this.url.split(/\.com|\.cn|\.net|\.cc/);
        const pathStr = urlSplits[1];
        if (pathStr === '') {
            return '';
        }
        return pathStr.replace(/^\//, '').replace(/\/[^/]*\.html/, '');
    }
    // 获取 Url 查询参数
    _parseQuery () {
        if (this.url === '') {
            return {};
        }
        const queryStr = this.url.split('?');
        const query = {};
        queryStr.split('&').forEach((item) => {
            const values = item.split('=');
            query[values[0]] = values[1];
        });
        return query;
    }
    // 字符化 Url
    format ({ url = '', protocol, host, path = '', query = {} }) {
        if (url) {
            return `${url}${url.indexOf('?') > -1 ? '' : '?'}${stringifyQuery(query)}`;
        }
        return `${this.protocol}//${host}${path}${stringifyQuery(query)}`;
    }
    // 格式化 Url
    parse (url = '') {
        this.url = url;
        const host = this._parseHost();
        const path = this._parsePath();
        const query = this._parseQuery();

        return {
            host,
            path,
            query
        };
    }
};

export default new URI();
