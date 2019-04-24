import '@scss/home.scss';
import App from '@app';

new App({
    data: {
        name: '王佳欣'
    },
    watchs: {
        sex: 'male'
    },
    sexHandler (value: any, oldValue: any) {
        console.log('sex changed from', oldValue, '=>', value);
    },
    bindEvents () {
        console.log('bindEvents');
    },

    init () {
        console.log('1234123');
        this.sex = 'female';
        console.log(this.$route);
    }
});
