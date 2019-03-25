import * as actionTypes from '../constants';

const initialState = {
    server: false
};

export default (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.DETAIL_FETCH_REQUEST:
            return Object.assign({}, state);
        case actionTypes.DETAIL_FETCH_SUCCESS:
            return Object.assign({}, state);
        case actionTypes.IDEAS_FETCH_ERROR:
            return Object.assign({}, state);
        default:
            return state;
    }
};