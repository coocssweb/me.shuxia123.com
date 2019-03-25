import * as actionTypes from '../constants';

const initialState = {
    list: [],
    total: 0,
    server: false
};

export default (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.IDEAS_FETCH_REQUEST:
            return Object.assign({}, state);
        case actionTypes.IDEAS_FETCH_SUCCESS:
            const { list } = action.result;
            return Object.assign({}, state, { list });
        case actionTypes.IDEAS_FETCH_ERROR:
            return Object.assign({}, state);
        default:
            return state;
    }
};
