/**
 * @file utils/ajax.ts ajax网络请求
 * @author: 王佳欣
 * @email: 1974740999@qq.com
 */
import { AjaxOptions } from '../../interface';

const defaultAjaxOption: AjaxOptions = {
    url: '',
    method: 'get',
    data: {},
    contentType: 'application/x-www-from-urlencoded',
    xhrFields: {},
    token: '',
    async: true
};

export const ajax = (options: AjaxOptions) => {
    options = {...options, ...defaultAjaxOption};
    
    return new Promise ((reslove, reject) => {
        const xmlHttp: XMLHttpRequest = new XMLHttpRequest();
        xmlHttp.onreadystatechange = function () {
            if (xmlHttp.readyState !== 4) {
                return false;
            }
            if (xmlHttp.status >= 200 && xmlHttp.status <= 304) {
                reslove(JSON.parse(xmlHttp.responseText));
            } else {
                reject(JSON.parse(xmlHttp.responseText));
            }
        };

        // define request data
        let requestData: any;
        if (options.contentType === 'application/x-www-from-urlencoded') {
            const requestDataKeys = Object.keys(options.data);
            requestData = requestDataKeys.map(key => `${key} = ${options.data[key]}`).join('&');
        } else if (options.contentType = 'multipart/form-data') {
            requestData = options.data;
        }
        // define request header
        options.token !== '' && xmlHttp.setRequestHeader('Authorization', options.token);
        xmlHttp.setRequestHeader('Content-Type', options.contentType);
        xmlHttp.setRequestHeader('Accept', options.dataType);
        xmlHttp.open(options.method, options.url, options.async);
        // when cross domain, set withCredentials to send cookies
        if (options.xhrFields.withCredentials) {
            xmlHttp.withCredentials = options.xhrFields.withCredentials;
        }
        xmlHttp.send(requestData);
    });
};
