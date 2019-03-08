import errorCode from '../../const/errorCode';
import ArticleModel from '../../dao/models/article';
import BodyFormatter from '../../utils/bodyFormatter';

const fetch = async (ctx, next) => {
    const { page = 1, size = 10 } = ctx.request.query;
    const result = await ArticleModel.fetch();
    ctx.body = BodyFormatter(undefined, result);
};

const fetchOne = async (ctx, next) => {
    const { id } = ctx.params;
    const result = await ArticleModel.findById(id);
    if (result) {
        ctx.body = BodyFormatter(undefined, result);
    } else {
        ctx.body = BodyFormatter(errorCode.DATA_NOT_FOUND);
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
        ctx.body = BodyFormatter(undefined, response);
    }, (error) => {
        ctx.body = BodyFormatter({ ...errorCode.CREATE_ERROR, desc: JSON.string(error) });
    });
};

const edit = async (ctx, next) => {
    const requestData = ctx.request.body;
    const { id } = ctx.params;
    await ArticleModel.updateInclude({ id: parseInt(id) }, requestData).then((response) => {
        ctx.body = BodyFormatter(undefined);
    }, (error) => {
        ctx.body = BodyFormatter({ ...errorCode.EDIT_ERROR, desc: JSON.stringify(error) });
    });
};

const remove = async (ctx, next) => {
    let { id } = ctx.params;
    await ArticleModel.removeById(id).then((response) => {
        ctx.body = BodyFormatter(undefined);
    }, (error) => {
        ctx.body = BodyFormatter({ ...errorCode.REMOVE_ERROR, desc: JSON.string(error) });
    });
};

export default {
    fetch,
    fetchOne,
    create,
    edit,
    remove
};
