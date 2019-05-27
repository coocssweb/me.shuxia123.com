/**
 * @file utils/uri.ts uri相关
 * @author: 王佳欣
 * @email: 1974740999@qq.com
 */

import { Uri } from '../interface';
export default class URI {
    
    private static stringifyQuery (queries: Object): string {
        return Object.keys(queries).map(key => {
            return `${key}=${queries[key]}`
        }).join('&');
    }

    private static parseHost (url: string): {hostname: string, port: number} {
        let port = 80;
        let hostname = '';
        url = url.replace(/\/\//ig, '/');
        let pos = url.indexOf('/');

        if (pos !== -1) {
            hostname = url.substring(0, pos);
        }
    
        pos = hostname.indexOf(':');

        if (pos !== -1) {
            port = parseInt(hostname.substring(pos + 1, hostname.length) || '80');
            hostname = hostname.substring(0, pos);
        }

        return {hostname, port};
    }

    private static parseQuery (url: string): Object {
        const query = {};
        const splits = url.split('?');

        if (splits.length > 1) {
            splits[1].split('&').forEach((item) => {
                const values = item.split('=');
                query[values[0]] = values[1];
            });
        }
        
        return query;
    }

    private static parsePath (url: string): string {
        let path = '';
        let pos = url.indexOf('/');
        let lastPos = url.lastIndexOf('/');

        if (pos > -1 && pos !== lastPos) {
            path = url.substring(pos, lastPos);
        }

        return path;
    }

    public static parse (url: string): Uri {
        let pos = url.indexOf('://');
        if (pos !== -1) {
            url = url.substring(pos + 3, url.length);
        }

        const { hostname, port } = this.parseHost(url);
        const path = this.parsePath(url);
        const query = this.parseQuery(url);

        return {
            hostname,
            port,
            path,
            query
        };
    }

    public static format (uri: Uri): string {
        const url = `${uri.protocol || 'http'}://
            ${uri.hostname}
            ${uri.path}
            ${URI.stringifyQuery(uri.query)}`;
            
        return url;
    }
}