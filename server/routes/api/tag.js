import Router from 'koa-router';
import apiControl from '../../controllers/api/tag';
import passport from 'passport';
import '../../utils/passport';

let router = new Router({
    prefix: '/api'
});

router.get('/tags/:id', apiControl.fetchOne);

router.get('/tags', apiControl.fetch);

router.post(
    '/tags', 
    passport.authenticate('administrator', { session: false }), 
    apiControl.create
    );

router.put(
    '/tags/:id', 
    passport.authenticate('administrator', { session: false }), 
    apiControl.edit
    );
    
router.delete(
    '/tags/:id', 
    passport.authenticate('administrator', { session: false }), 
    apiControl.remove
    );

export default router;