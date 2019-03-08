import Router from 'koa-router';
import apiControl from '../../controllers/api/article';

let router = new Router({
    prefix: '/api'
});

router.get('/articles/:id', apiControl.fetchOne);
router.get('/articles', apiControl.fetch);
router.post('/articles', apiControl.create);
router.put('/articles/:id', apiControl.edit);
router.delete('/articles/:id', apiControl.remove);

export default router;