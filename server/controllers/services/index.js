import errorCode from '../../const/errorCode';
import ArticleModel from '../../dao/models/article';
import ProjectModel from '../../dao/models/project';
import TagModel from '../../dao/models/tag';

const fetchRecommendIdeas = async (ctx, next) => {
    const { page = 1, size = 3 } = ctx.request.query;
    const result = await ArticleModel.fetch({ }, page, size);
    ctx.body = ctx.bodyFormatter(undefined, result);
};

const fetchRecommendProjects = async (ctx, next) => {
    const { page = 1, size = 3 } = ctx.request.query;
    const result = await ProjectModel.fetch({ }, page, size);
    ctx.body = ctx.bodyFormatter(undefined, result);
};

const fetchClassifies = async (ctx, next) => {
    const result = await TagModel.fetch();
    const total = result.reduce((prev, current) => {
        return prev + current.total;
    }, 0);
    ctx.body = ctx.bodyFormatter(undefined, [{ id: 0, name: '所有', path: '', total }, ...result]);
};

const fetchIdeas = async (ctx, next) => {
    const { page = 1, size = 10 } = ctx.request.query;
    const { classify = '' } = ctx.params;
    const query = {};
    if (classify) {
        query.classify = classify;
    }
    const result = await ArticleModel.fetch(query, page, size);
    ctx.body = ctx.bodyFormatter(undefined, result);
};

const fetchProjects = async (ctx, next) => {
    const { page = 1, size = 10 } = ctx.request.query;
    const result = await ProjectModel.fetch({ }, page, size);
    ctx.body = ctx.bodyFormatter(undefined, result);
};


const fetchOne = async (ctx, next) => {
    const { id } = ctx.params;
    const result = await ArticleModel.findById(id);
    if (result) {
        ctx.body = ctx.bodyFormatter(undefined, result);
    } else {
        ctx.body = ctx.bodyFormatter(errorCode.DATA_NOT_FOUND);
    }
};

export default {
    fetchRecommendIdeas,
    fetchRecommendProjects,
    fetchClassifies,
    fetchIdeas,
    fetchProjects,
    fetchOne
};
