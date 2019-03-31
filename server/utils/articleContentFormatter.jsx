export default (content) => {
    const regCode = /<pre>.*<\/pre>/ig;
    const regBr = /<br\/>/ig;
    const regImage = /\d+\./ig;
    let result = content.replace(regCode, (str) => {
        return str.replace(regBr, '\n');
    });
    result = result.replace(regImage, (str) => {
        return str.replace('.', '_preview.');
    });
    return result;
};