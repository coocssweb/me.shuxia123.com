export default ({object, key, callback}) => {
    let value = object[key];
    Object.defineProperty(object, key, {
        get () {
            return value;
        },
        set (newValue) {
            if (value === newValue) {
                return;
            }
            value = newValue;
            callback && callback(value);
        }
    });
};
