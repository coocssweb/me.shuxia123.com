import * as errorCode from '../../const/errorCode';
import ArticleModel from '../../dao/models/article';

const fetch = async (ctx, next) => {
    const { id } = ctx.params;
    const result = await ArticleModel.fetch();
    ctx.body = JSON.stringify(result);
};

const fetchOne = async (ctx, next) => {
    const { id } = ctx.params;
    const result = await ArticleModel.findById(id);
    if (!result) {
        ctx.body = JSON.stringify(errorCode.DATA_NOT_FOUND);
    } else {
        ctx.body = JSON.stringify(result);
    }
};

const create = async (ctx, next) => {
    const requestData = ctx.body;
    const article = new ArticleModel(requestData);

    let result = await new Promise((resolve, reject) => {
        article.save(error => {
            error ? reject(error) : resolve(article)
        });
    }).catch(error => {
        ctx.body = JSON.stringify({ ...errorCode.CREATE_ERROR });
    });

    ctx.body = JSON.stringify(result);
};

const edit = async (ctx, next) => {
    const requestData = ctx.body;
    const { id } = ctx.params;

    let result = await ArticleModel.updateInclude({ id }, requestData);
    ctx.body = JSON.stringify(result);
};

const remove = async (ctx, next) => {
    let { id } = ctx.params;
    let result = await articleApi.remove(id);
    ctx.body = JSON.stringify(result);
};

export default {
    fetch,
    fetchOne,
    create,
    edit,
    remove
};
