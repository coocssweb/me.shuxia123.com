import * as actionTypes from '../constants';

const initialState = {
    server: false,
    article: null
};

export default (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.DETAIL_FETCH_SUCCESS:
            const { response } = action.result;
            return Object.assign({}, state, { article: response });
        case actionTypes.DETAIL_RESET_SERVER:
            return Object.assign({}, state, { server: false });
        default:
            return state;
    }
};