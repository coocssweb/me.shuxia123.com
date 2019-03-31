export default (url) => {
    return url.replace(/_\d+\./, (str) => {
        return str.replace('.', '_preview.');
    });
};
