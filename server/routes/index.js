import Router from 'koa-router';
import articleApi from './api/article';

let router = Router();
router.use(articleApi.routes(), articleApi.allowedMethods());
export default router;
