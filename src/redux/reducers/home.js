import * as actionTypes from '../constants';

const initialState = {
    ideas: [],
    projects: [],
    server: false
};

export default (state = initialState, action) => {
    const { result } = action;
    switch (action.type) {
        case actionTypes.RECOMMEND_IDEAS_FETCH_SUCCESS:
            return Object.assign({}, state, { ideas: result.response });
        case actionTypes.RECOMMEND_PROJECTS_FETCH_SUCCESS:
            return Object.assign({}, state, { projects: result.response });
        default:
            return state;
    }
};