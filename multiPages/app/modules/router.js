import Is from '@utils/is';
import Type from 'utils/type';
import Uri from 'utils/uri';

const format = (...args) => {
    if (Type(url) === 'string') {
        return url.indexOf('http') === 0 ? url : `${this.route.host}/${url}`;
    } else {
        return Uri.format(url);
    }
};

export default {
    push (url) {
        window.location.href = format(url);
    },
    replace (url) {
        window.location.replace(format(url));
    },
    goBack () {
        if (Is.ios()) {
            if (document.referrer) {
                this.$router.replace(document.referrer);
            } else {
                window.history.go(-1);
            }

        } else {
            window.history.go(-1);
        }
    },
    reload () {
        window.location.reload();
    }
};
