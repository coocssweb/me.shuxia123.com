const stringifyQuery = (query) => {
    return Object.keys(query).map(key => `${key}=${query[key]}`).join('&');
};

class URI {
    _parseHost (url) {
        let string = url;
        let port = '80';
        if (string === '') {
            return '';
        }

        string = string.replace(/\/\//ig, '/');
        let pos = string.indexOf('/');
        if (pos !== -1) {
            string = string.substring(0, pos);
        }

        pos = string.indexOf(':');
        if (pos !== -1) {
            port = string.substring(pos, string.length);
            string = string.substring(0, pos);
        }

        return {host: string, port};
    }
    _parsePath (url) {
        let string = url;
        if (string === '') {
            return '';
        }

        // www.abc.com/abc/ccc.html
        let pos = string.indexOf('/');
        if (pos === -1) {
            return '';
        }
        let lastPos = string.lastIndexOf('/');
        if (pos === lastPos) {
            return '';
        }
        return string.substring(pos, lastPos);
    }
    _parseQuery (url) {
        const string = url;
        if (string === '') {
            return {};
        }
        const splits = string.split('?');
        if (splits.length === 1) {
            return {};
        }
        const query = {};
        splits[1].split('&').forEach((item) => {
            const values = item.split('=');
            query[values[0]] = values[1];
        });
        return query;
    }
    format ({ url = '', protocol, host, path = '', query = {} }) {
        if (url) {
            return `${url}${url.indexOf('?') > -1 ? '' : '?'}${stringifyQuery(query)}`;
        }
        return `${this.protocol}//${host}${path}${stringifyQuery(query)}`;
    }
    parse (url = '') {
        this.url = url;
        let string = this.url;
        let pos = string.indexOf('://');
        if (pos !== -1) {
            string = string.substring(pos + 3, string.length);
        }

        const { host, port } = this._parseHost(string);
        const path = this._parsePath(string);
        const query = this._parseQuery(string);

        return {
            url,
            host,
            port,
            path,
            query
        };
    }
}

export default new URI();
