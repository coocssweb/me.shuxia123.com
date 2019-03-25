import errorCode from '../../const/errorCode';
import ArticleModel from '../../dao/models/article';

const fetchRecommends = async (ctx, next) => {
    const { page = 1, size = 3 } = ctx.request.query;
    const result = await ArticleModel.fetch({ }, page, size);
    ctx.body = ctx.bodyFormatter(undefined, result);
};

const fetchIdeas = async (ctx, next) => {
    const { page = 1, size = 10 } = ctx.request.query;
    const result = await ArticleModel.fetch({ }, page, size);
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
    fetchRecommends,
    fetchIdeas,
    fetchOne
};
