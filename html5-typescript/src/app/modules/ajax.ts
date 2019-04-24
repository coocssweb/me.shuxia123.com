/**
 * @file utils/ajax.ts ajax网络请求
 * @author: 王佳欣
 * @email: 1974740999@qq.com
 */
import { AjaxOptions, ContentType, XhrFields } from '../../interface';

const defaultAjaxOption: AjaxOptions = {
    url: '',
    method: 'get',
    data: {},
    contentType: ContentType.Urlencoded,
    xhrFields: {
        withCredentials: false
    },
    token: '',
    async: true
};

export const ajax = (options: AjaxOptions) => {
    options = {...options, ...defaultAjaxOption};
    
    const promise = new Promise ((reslove, reject) => {
        const xmlHttp: XMLHttpRequest = new XMLHttpRequest();
        xmlHttp.onreadystatechange = function () {
            if (xmlHttp.readyState === 4) {
                return;
            }

            if (xmlHttp.status >= 200 && xmlHttp.status <= 304) {
                reslove(JSON.parse(xmlHttp.responseText));
            } 
            else {
                reject(JSON.parse(xmlHttp.responseText));
            }
        };

        // define request data
        let requestData: any;
        if (options.contentType === ContentType.Urlencoded) {
            const allKeys = Object.keys(options.data);

            requestData = allKeys.map(key => { 
                return `${key} = ${options.data[key]}`
            }).join('&');
        } 
        else if (options.contentType = ContentType.FormData) {
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

    return promise;
};
