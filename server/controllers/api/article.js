import errorCode from '../../const/errorCode';
import ArticleModel from '../../dao/models/article';

const fetch = async (ctx, next) => {
    const { page = 1, size = 10 } = ctx.request.query;
    const result = await ArticleModel.fetch();
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

const create = async (ctx, next) => {
    const requestData = ctx.request.body;
    const article = new ArticleModel(requestData);

    await new Promise((resolve, reject) => {
        article.save(error => {
            error ? reject(error) : resolve(article)
        });
    }).then((response) => {
        ctx.body = ctx.bodyFormatter(undefined, response);
    }, (error) => {
        ctx.body = ctx.bodyFormatter({ ...errorCode.CREATE_ERROR, desc: JSON.string(error) });
    });
};

const edit = async (ctx, next) => {
    const requestData = ctx.request.body;
    const { id } = ctx.params;
    await ArticleModel.updateInclude({ id: parseInt(id) }, requestData).then((response) => {
        ctx.body = ctx.bodyFormatter(undefined);
    }, (error) => {
        ctx.body = ctx.bodyFormatter({ ...errorCode.EDIT_ERROR, desc: JSON.stringify(error) });
    });
};

const remove = async (ctx, next) => {
    let { id } = ctx.params;
    await ArticleModel.removeById(id).then((response) => {
        ctx.body = ctx.bodyFormatter(undefined);
    }, (error) => {
        ctx.body = ctx.bodyFormatter({ ...errorCode.REMOVE_ERROR, desc: JSON.string(error) });
    });
};

export default {
    fetch,
    fetchOne,
    create,
    edit,
    remove
};
