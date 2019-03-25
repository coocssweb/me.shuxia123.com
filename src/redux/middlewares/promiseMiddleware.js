export default ({ dispatch, getState }) => {
    return (next) => (action) => {
        const { promise, types, callback, ...rest } = action;

        if (!promise) {
            return next(action);
        }

        const [REQUEST, SUCCESS, FAILURE] = types;

        next({ ...rest, type: REQUEST });

        return promise().then(
            (result) => {
                next({ ...rest, callback, result, type: SUCCESS });
            },
            (error) => {
                next({ ...rest, callback, error, type: FAILURE });
            }
        );
    };
};
