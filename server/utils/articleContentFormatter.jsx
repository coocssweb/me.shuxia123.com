export default (content) => {
    console.log(content);
    const regCode = /<pre>.*<\/pre>/ig;
    const regBr = /<br\/>/ig;
    return content.replace(regCode, (str) => {
        return str.replace(regBr, '\n');
    });
};