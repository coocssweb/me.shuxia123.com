import Router from 'koa-router';
import articleApi from './api/article';
import administratorApi from './api/administrator';
import tagApi from './api/tag';
import projectApi from './api/project';
import toolApi from './api/tool';
import homeApi from './home';
import serviceApi from './services';

let router = Router();
router.use(articleApi.routes(), articleApi.allowedMethods());
router.use(administratorApi.routes(), administratorApi.allowedMethods());
router.use(tagApi.routes(), tagApi.allowedMethods());
router.use(projectApi.routes(), projectApi.allowedMethods());
router.use(toolApi.routes(), toolApi.allowedMethods());
router.use(homeApi.routes(), homeApi.allowedMethods());
router.use(serviceApi.routes(), serviceApi.allowedMethods());
export default router;
