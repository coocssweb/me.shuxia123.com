import * as actionTypes from '../constants';
import api from '../../api';

export const fetchRecommendIdeas = (callback) => {
    return {
        types: [actionTypes.RECOMMEND_IDEAS_FETCH_REQUEST, actionTypes.RECOMMEND_IDEAS_FETCH_SUCCESS, actionTypes.RECOMMEND_IDEAS_FETCH_ERROR],
        promise: () => {
            return api.fetchRecommendIdeas();
        },
        callback
    };
};

export const fetchRecommendProjects = (callback) => {
    return {
        types: [actionTypes.RECOMMEND_PROJECTS_FETCH_REQUEST, actionTypes.RECOMMEND_PROJECTS_FETCH_SUCCESS, actionTypes.RECOMMEND_PROJECTS_FETCH_SUCCESS],
        promise: () => {
            return api.fetchRecommendProjects();
        },
        callback
    };
};

export const fetchClassifies = (callback) => {
    return {
        types: [actionTypes.CLASSIFIES_FETCH_REQUEST, actionTypes.CLASSIFIES_FETCH_SUCCESS, actionTypes.CLASSIFIES_FETCH_ERROR],
        promise: () => {
            return api.fetchClassifies();
        },
        callback
    };
};

export const fetchIdeas = ({ classify, page }, callback) => {
    return {
        types: [actionTypes.IDEAS_FETCH_REQUEST, actionTypes.IDEAS_FETCH_SUCCESS, actionTypes.IDEAS_FETCH_ERROR],
        data: { classify, page },
        promise: () => {
            return api.fetchIdeas({ classify, page });
        },
        callback
    };
};

export const fetchProjects = (page, callback) => {
    return {
        types: [actionTypes.PROJECTS_FETCH_REQUEST, actionTypes.PROJECTS_FETCH_SUCCESS, actionTypes.PROJECTS_FETCH_SUCCESS],
        promise: () => {
            return api.fetchProjects(page);
        },
        callback
    };
};

export const fetchDetail = (id, callback) => {
    return {
        types: [actionTypes.DETAIL_FETCH_REQUEST, actionTypes.DETAIL_FETCH_SUCCESS, actionTypes.DETAIL_FETCH_ERROR],
        promise: () => {
            return api.fetchDetail(id);
        },
        callback
    };
};
