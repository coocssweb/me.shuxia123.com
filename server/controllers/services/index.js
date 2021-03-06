import errorCode from "../../const/errorCode";
import ArticleModel from "../../dao/models/article";
import ProjectModel from "../../dao/models/project";
import TagModel from "../../dao/models/tag";
import DemoModel from "../../dao/models/demo";
import contentFormatter from "../../utils/articleContentFormatter";
import previewImageFormatter from "../../utils/previewImageFormatter";
import descriptionFormatter from "../../utils/descriptionFormatter";
import { getDeviceAgent } from "../../utils";

import { fetchAllBestwish, fetchOneBestwish, cnzzBestwish } from "./bestwish";

const fetchRecommendIdeas = async (ctx, next) => {
  const IS_MOBILE = getDeviceAgent(ctx.request) === "MOBILE";
  const { page = 1, size = IS_MOBILE ? 4 : 3 } = ctx.request.query;
  const result = await ArticleModel.fetch({}, page, size);
  descriptionFormatter(ctx.request, result);
  ctx.body = ctx.bodyFormatter(undefined, result);
};

const fetchRecommendProjects = async (ctx, next) => {
  const IS_MOBILE = getDeviceAgent(ctx.request) === "MOBILE";
  const { page = 1, size = IS_MOBILE ? 3 : 4 } = ctx.request.query;
  const result = await ProjectModel.fetch({}, page, size);
  ctx.body = ctx.bodyFormatter(undefined, result);
};

const fetchRecommendDemos = async (ctx, next) => {
  const { page = 1, size = 5 } = ctx.request.query;
  const result = await DemoModel.fetch({}, page, size);
  ctx.body = ctx.bodyFormatter(undefined, result);
};

const fetchClassifies = async (ctx, next) => {
  const result = await TagModel.fetch();
  const total = result.reduce((prev, current) => {
    return prev + current.total;
  }, 0);
  ctx.body = ctx.bodyFormatter(undefined, [
    { id: 0, name: "所有", path: "", total },
    ...result,
  ]);
};

const fetchIdeas = async (ctx, next) => {
  const { page = 1, size = 10 } = ctx.request.query;
  const { classify = "" } = ctx.params;
  const query = {};
  if (classify) {
    query.classify = classify;
  }
  const result = await ArticleModel.fetch(query, page, size);
  descriptionFormatter(ctx.request, result);
  ctx.body = ctx.bodyFormatter(undefined, result);
};

const fetchProjects = async (ctx, next) => {
  const { page = 1, size = 10 } = ctx.request.query;
  const result = await ProjectModel.fetch({}, page, size);
  ctx.body = ctx.bodyFormatter(undefined, result);
};

const fetchDemos = async (ctx, next) => {
  const { page = 1, size = 10 } = ctx.request.query;
  const result = await DemoModel.fetch({}, page, size);
  ctx.body = ctx.bodyFormatter(undefined, result);
};

const fetchOne = async (ctx, next) => {
  const { id } = ctx.params;
  const result = await ArticleModel.findById(id);
  result.content = contentFormatter(result.content);
  result.posters.forEach((item, index) => {
    result.posters[index] = previewImageFormatter(result.posters[index]);
  });
  if (result) {
    ctx.body = ctx.bodyFormatter(undefined, result);
  } else {
    ctx.body = ctx.bodyFormatter(errorCode.DATA_NOT_FOUND);
  }
};

export default {
  fetchRecommendIdeas,
  fetchRecommendProjects,
  fetchRecommendDemos,
  fetchClassifies,
  fetchIdeas,
  fetchProjects,
  fetchDemos,
  fetchOne,
  fetchAllBestwish,
  fetchOneBestwish,
  cnzzBestwish,
};
