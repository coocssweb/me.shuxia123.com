import * as actionTypes from '../constants';

const initialState = {
    list: [],
    classifies: [],
    total: 0,
    page: 1,
    currentPath: '',
    server: false
};

export default (state = initialState, action) => {
    const { result, data } = action;

    switch (action.type) {
        case actionTypes.IDEAS_FETCH_REQUEST:
            return Object.assign({}, state, { currentPath: data.classify });
        case actionTypes.IDEAS_FETCH_SUCCESS:
            return Object.assign({}, state, { list: result.response });
        case actionTypes.CLASSIFIES_FETCH_SUCCESS:
            // 分类前面添加【全部内容】
            return Object.assign({}, state, {
                classifies: result.response,
                // todo：设置分页信息
            });
        default:
            return state;
    }
};
