import errorCode from "../../const/errorCode";
import BestwishModel from "../../dao/models/bestwish";

const fetch = async (ctx, next) => {
  const { page = 1, size = 10 } = ctx.request.query;
  const result = await BestwishModel.fetchAll({}, page, size);
  ctx.body = ctx.bodyFormatter(undefined, result);
};

const fetchOne = async (ctx, next) => {
  const { code } = ctx.params;
  const result = await BestwishModel.fetchAll(
    { enable: 1, mediaCode: code },
    page,
    size
  );

  if (result) {
    let response = {};
    let index = 0;
    if (result.length > 0) {
      index = parseInt(Math.random() * 10);
      response = result[index];
    }
    ctx.body = ctx.bodyFormatter(undefined, response);
  } else {
    ctx.body = ctx.bodyFormatter(errorCode.DATA_NOT_FOUND);
  }
};

const create = async (ctx, next) => {
  const requestData = ctx.request.body;
  const bestwish = new BestwishModel(requestData);
  await new Promise((resolve, reject) => {
    bestwish.save((error) => {
      error ? reject(error) : resolve(article);
    });
  }).then(
    (response) => {
      ctx.body = ctx.bodyFormatter(undefined, response);
    },
    (error) => {
      ctx.body = ctx.bodyFormatter({
        ...errorCode.CREATE_ERROR,
        desc: JSON.stringify(error),
      });
    }
  );
};

const edit = async (ctx, next) => {
  const requestData = ctx.request.body;
  const { id } = ctx.params;
  await BestwishModel.updateInclude({ id: parseInt(id) }, requestData).then(
    (response) => {
      ctx.body = ctx.bodyFormatter(undefined);
    },
    (error) => {
      ctx.body = ctx.bodyFormatter({
        ...errorCode.EDIT_ERROR,
        desc: JSON.stringify(error),
      });
    }
  );
};

const remove = async (ctx, next) => {
  let { id } = ctx.params;

  await BestwishModel.removeById(id).then(
    (response) => {
      ctx.body = ctx.bodyFormatter(undefined);
    },
    (error) => {
      ctx.body = ctx.bodyFormatter({
        ...errorCode.REMOVE_ERROR,
        desc: JSON.string(error),
      });
    }
  );
};

export default {
  fetch,
  fetchOne,
  create,
  edit,
  remove,
};
