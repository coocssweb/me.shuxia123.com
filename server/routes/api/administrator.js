import Router from 'koa-router';
import apiControl from '../../controllers/api/administrator';
import passport from 'passport';
import '../../utils/passport';

let router = new Router({
    prefix: '/api'
});
router.get('/auth/info', 
    passport.authenticate('administrator', { session: false }), 
    apiControl.fetchOne);

// router.post( '/init', apiControl.create );

router.put(
    '/auth', 
    passport.authenticate('administrator', { session: false }), 
    apiControl.edit
    );

router.post(
    '/auth/login', 
    apiControl.login
    );

router.post(
    '/auth/logout', 
    apiControl.logout
    );

export default router;