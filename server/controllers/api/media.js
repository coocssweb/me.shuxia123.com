import MediaModel from "../../dao/models/media";
import errorCode from "../../const/errorCode";
import generatorContent from './generager';

const fetch = async function (ctx, next) {
  const result = await MediaModel.fetch();
  ctx.body = ctx.bodyFormatter(undefined, result);
};

const fetchOne = async function (ctx, next) {
  const { id } = ctx.request.params;
  const result = await MediaModel.findById(id);
  if (result) {
    ctx.body = ctx.bodyFormatter(undefined, result);
  } else {
    ctx.body = ctx.bodyFormatter(errorCode.DATA_NOT_FOUND);
  }
};

const create = async function (ctx, next) {
  const requestData = ctx.request.body;
  const { code } = requestData;
  const tag = new MediaModel(requestData);
  await new Promise((resolve, reject) => {
    tag.save(
      (error) => {
        error ? reject(error) : resolve(tag);
      },
      { _id: 0, __v: 0, by: 0 }
    );
  }).then(
    (response) => {
      ctx.body = ctx.bodyFormatter(undefined, response);
      generatorContent(code);
    },
    (error) => {
      console.log(error);
      ctx.body = ctx.bodyFormatter({
        ...errorCode.CREATE_ERROR,
        desc: JSON.stringify(error),
      });
    }
  );
};

const edit = async function (ctx, next) {
  const requestData = ctx.request.body;
  const { id } = ctx.params;
  const { code } = requestData;


  await MediaModel.updateInclude({ id: parseInt(id) }, requestData).then(
    (response) => {
      ctx.body = ctx.bodyFormatter(undefined);
      generatorContent(code);
    },
    (error) => {
      ctx.body = ctx.bodyFormatter({
        ...errorCode.EDIT_ERROR,
        desc: JSON.stringify(error),
      });
    }
  );
};

const remove = async function (ctx, next) {
  let { id } = ctx.params;
  await MediaModel.removeById(id).then(
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
