export enum ContentType {
    Urlencoded = 'application/x-www-from-urlencoded',
    FormData = 'multipart/form-data'
};

export interface XhrFields{
    withCredentials : boolean
};

export interface AjaxOptions {
    url?: string,
    data?: object,
    dataType?: string, 
    contentType?: string, 
    method?: string,
    xhrFields?: XhrFields,
    token?: string,
    async?: boolean
};

export interface Uri {
    protocol?: string,
    hostname: string,
    port?: number,
    path?: string,
    query?: Object
};

export interface ShareInfo {
    title: string,
    desc?: string,
    link?: string,
    imgUrl: string
};