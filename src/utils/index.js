export const formatDate = (timestamp = new Date(), formatStr = 'yyyy-MM-dd hh:mm:ss') => {
    let date = new Date(timestamp);

    let obj = {
        'M+': date.getMonth() + 1,
        'd+': date.getDate(),
        'h+': date.getHours(),
        'm+': date.getMinutes(),
        's+': date.getSeconds(),
        'S': date.getMilliseconds()
    };

    // 年份，4位数
    if (/(y+)/.test(formatStr)) {
        formatStr = formatStr.replace(RegExp.$1, `${date.getFullYear()}`.substr(4 - RegExp.$1.length));
    }

    for (let key in obj) {
        if (new RegExp(`(${key})`).test(formatStr)) {
            formatStr = formatStr.replace(RegExp.$1, (RegExp.$1.length === 1) ? (obj[key]) : `00${obj[key]}`.substr(`${obj[key]}`.length));
        }
    }
    return formatStr;
};

export const formatImage = (url, type) => {
    if (type === 'preview') {
        return url.replace(/_\d+\./, (str) => {
            return str.replace('.', '_preview.');
        });
    } else {
        return url.replace('_preview', '');
    }
};
