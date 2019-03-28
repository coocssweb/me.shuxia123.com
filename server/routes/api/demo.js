import Router from 'koa-router';
import apiControl from '../../controllers/api/demo';
import passport from 'passport';
import '../../utils/passport';

let router = new Router({
    prefix: '/api'
});

router.get('/demos', apiControl.fetch);

router.post(
    '/demos',
    passport.authenticate('administrator', { session: false }), 
    apiControl.create
    );

router.put(
    '/demos/:id',
    passport.authenticate('administrator', { session: false }), 
    apiControl.edit
    );
    
router.delete(
    '/demos/:id',
    passport.authenticate('administrator', { session: false }), 
    apiControl.remove
    );

export default router;