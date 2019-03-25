export default ({ getState, dispatch }) => {
    return (next) => {
        return (action) => {
            const { result, error, callback, ...reset } = action;
            next({ result, ...reset });
            callback && callback(result || error);
        };
    };
};
