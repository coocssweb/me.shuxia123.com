import * as actionTypes from '../constants';
import api from '../../api';

export const fetchHome = (callback) => {
    return {
        types: [actionTypes.HOME_FETCH_REQUEST, actionTypes.HOME_FETCH_SUCCESS, actionTypes.HOME_FETCH_ERROR],
        promise: () => {
            return api.fetchHome();
        },
        callback
    };
};

export const fetchIdeas = (page) => {
    return {
        types: [actionTypes.IDEAS_FETCH_REQUEST, actionTypes.IDEAS_FETCH_SUCCESS, actionTypes.IDEAS_FETCH_ERROR],
        promise: () => {
            return api.fetchIdeas(page);
        }
    };
};

export const fetchDetail = (id) => {
    return {
        types: [actionTypes.DETAIL_FETCH_REQUEST, actionTypes.DETAIL_FETCH_SUCCESS, actionTypes.DETAIL_FETCH_ERROR],
        promise: () => {
            return api.fetchIdeas(id);
        }
    };
};
