import Router from 'koa-router';
import articleApi from './api/article';
import administratorApi from './api/administrator';

let router = Router();
router.use(articleApi.routes(), articleApi.allowedMethods());
router.use(administratorApi.routes(), administratorApi.allowedMethods());
export default router;
