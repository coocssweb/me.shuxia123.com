/**
 * IS
 * Created by 王佳欣 on 2018/4/11.
 */
const UA = navigator.userAgent.toLowerCase();

export default {
    isWeibo () {
        return /weibo/.test(UA);
    },
    isWechat () {
        return /micromessenger/.test(UA) && !/wxwork/.test(UA);
    },
    isQQ () {
        return /qq\//gi.test(UA);
    },
    isQZone () {
        return /qzone\//gi.test(UA);
    },
    isAndroid () {
        return /android/.test(UA);
    },
    isIos () {
        return /iphone|ipad|ipod/.test(UA);
    }
};
