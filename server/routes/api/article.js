import Router from 'koa-router';
import apiControl from '../../controllers/api/article';
import passport from 'passport';
import '../../utils/passport';

let router = new Router({
    prefix: '/api'
});

router.get('/articles/:id', apiControl.fetchOne);

router.get('/articles', apiControl.fetch);

router.post(
    '/articles', 
    passport.authenticate('administrator', { session: false }), 
    apiControl.create
    );

router.put(
    '/articles/:id', 
    passport.authenticate('administrator', { session: false }), 
    apiControl.edit
    );
    
router.delete(
    '/articles/:id', 
    passport.authenticate('administrator', { session: false }), 
    apiControl.remove
    );

export default router;