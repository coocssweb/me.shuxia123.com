let _class2type = {};
'Boolean Number String Function Array Date RegExp Object Error Null Undefined'.split(' ').map((item) => {
    _class2type[`[object ${item}]`] = item.toLowerCase();
});

export default (obj) => {
    return typeof obj === 'object' || typeof obj === 'function' ?
        _class2type[Object.prototype.toString.call(obj)]:
        typeof obj;
};
