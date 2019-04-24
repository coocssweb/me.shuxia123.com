/**
 * @file utils/router.ts 路由模块
 * @author: 王佳欣
 * @email: 1974740999@qq.com
 */

import Is from '@utils/is';
import URI from '@utils/uri';
const _is = Is();
const IS_IOS = _is.isIos();

export default class Router {
    
    private static formatURL (url: any): string {
        let urlResult = '';
        if (typeof url === 'string' && url.indexOf('http') === 0) {
            urlResult = url;
        } else if (typeof url === 'string') {
            const uri = URI.parse(window.location.href);
            urlResult = url.indexOf('/') === 0 ? `${uri.hostname}${url}` : `${uri.hostname}${uri.path}/${url}`
        } else {
            urlResult = URI.format(url);
        }
        return urlResult;
    }

    public static push (url: any): void {
        window.location.href = Router.formatURL(url);
    }

    public static replace (url) {
        window.location.replace(Router.formatURL(url));
    }

    public static goBack () {
        if (IS_IOS && document.referrer) {
            // 如果有referrer来路，需要强制重新加载
            Router.replace(document.referrer);
        } else {
            window.history.go(-1);
        }
    }

    public static reload () {
        window.location.reload();
    }
};
