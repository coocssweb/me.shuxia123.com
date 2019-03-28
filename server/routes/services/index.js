import Router from 'koa-router';
import controllers from '../../controllers/services';

let router = new Router({
    prefix: '/services'
});

router.get('/recommend/ideas', controllers.fetchRecommendIdeas);
router.get('/recommend/projects', controllers.fetchRecommendProjects);
router.get('/recommend/demos', controllers.fetchRecommendDemos);
router.get('/classifies', controllers.fetchClassifies);
router.get('/ideas', controllers.fetchIdeas);
router.get('/ideas/:classify', controllers.fetchIdeas);
router.get('/projects', controllers.fetchProjects);
router.get('/demos', controllers.fetchDemos);
router.get('/detail/:id', controllers.fetchOne);

export default router;
