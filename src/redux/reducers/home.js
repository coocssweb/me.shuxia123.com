import * as actionTypes from '../constants';

const initialState = {
    recommends: [],
    server: false
};

export default (state = initialState, action) => {
    const { result } = action;
    switch (action.type) {
        case actionTypes.HOME_FETCH_REQUEST:
            return Object.assign({}, state);
        case actionTypes.HOME_FETCH_SUCCESS:
            const { response } = result;
            return Object.assign({}, state, { recommends: response });
        case actionTypes.HOME_FETCH_ERROR:
            return Object.assign({}, state);
        default:
            return state;
    }
};