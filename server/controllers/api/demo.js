import DemoModel from '../../dao/models/demo';
import errorCode from '../../const/errorCode';

const fetch = async function (ctx, next) {
    const result = await DemoModel.fetch();
    ctx.body = ctx.bodyFormatter(undefined, result);
};


const create = async function (ctx, next) {
    const requestData = ctx.request.body;
    const demo = new DemoModel(requestData);
    await new Promise((resolve, reject) => {
        demo.save(error => {
            error ? reject(error) : resolve(demo)
        }, {_id: 0, __v: 0, by: 0});
    }).then((response) => {
        ctx.body = ctx.bodyFormatter(undefined, response);
    }, (error) => {
        ctx.body = ctx.bodyFormatter({ ...errorCode.CREATE_ERROR, desc: JSON.stringify(error) });
    });
};

const edit = async function (ctx, next) {
    const requestData = ctx.request.body;
    const { id } = ctx.params;
    await DemoModel.updateInclude({ id: parseInt(id) }, requestData).then((response) => {
        ctx.body = ctx.bodyFormatter(undefined);
    }, (error) => {
        ctx.body = ctx.bodyFormatter({ ...errorCode.EDIT_ERROR, desc: JSON.stringify(error) });
    });
};

const remove = async function (ctx, next) {
    let { id } = ctx.params;
    await DemoModel.removeById(id).then((response) => {
        ctx.body = ctx.bodyFormatter(undefined);
    }, (error) => {
        ctx.body = ctx.bodyFormatter({ ...errorCode.REMOVE_ERROR, desc: JSON.string(error) });
    });
};

export default {
    fetch,
    create,
    edit,
    remove
};
