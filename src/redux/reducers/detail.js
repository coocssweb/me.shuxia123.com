import * as actionTypes from '../constants';

const initialState = {
    server: false,
    article: null
};

export default (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.DETAIL_FETCH_REQUEST:
            return Object.assign({}, state);
        case actionTypes.DETAIL_FETCH_SUCCESS:
            const { response } = action.result;
            return Object.assign({}, state, { article: response, server: false });
        case actionTypes.IDEAS_FETCH_ERROR:
            return Object.assign({}, state);
        default:
            return state;
    }
};