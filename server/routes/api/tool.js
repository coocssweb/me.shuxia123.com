import Router from 'koa-router';
import passport from 'passport';
import KoaBody from 'koa-body';
import path from 'path';
import toolControl from '../../controllers/api/tool';
import '../../utils/passport';

let router = new Router({
    prefix: '/api/tool'
});

router.post('/upload', 
    passport.authenticate('administrator', { session: false }),
    KoaBody({
        multipart: true,
        formidable: {
            maxFileSize: 200*1024*1024
        }
    }), 
    toolControl.upload);
router.get('/timestamp', toolControl.getTimeCurrent);

export default router;
