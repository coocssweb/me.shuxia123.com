import Router from 'koa-router';
import controllers from '../../controllers/services';

let router = new Router({
    prefix: '/services'
});

router.get('/recommends', controllers.fetchRecommends);
router.get('/ideas', controllers.fetchIdeas);
router.get('/detail/:id', controllers.fetchOne);

export default router;
