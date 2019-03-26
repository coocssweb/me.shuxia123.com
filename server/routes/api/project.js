import Router from 'koa-router';
import apiControl from '../../controllers/api/project';
import passport from 'passport';
import '../../utils/passport';

let router = new Router({
    prefix: '/api'
});

router.get('/projects', apiControl.fetch);

router.post(
    '/projects',
    passport.authenticate('administrator', { session: false }), 
    apiControl.create
    );

router.put(
    '/projects/:id',
    passport.authenticate('administrator', { session: false }), 
    apiControl.edit
    );
    
router.delete(
    '/projects/:id',
    passport.authenticate('administrator', { session: false }), 
    apiControl.remove
    );

export default router;