import * as actionTypes from '../constants';

const initialState = {
    list: [],
    total: 0,
    server: false
};

export default (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.PROJECTS_FETCH_SUCCESS:
            const { response } = action.result;
            return Object.assign({}, state, { list: response });
        default:
            return state;
    }
};
