import path from 'path';
import Koa from 'koa';
import Cors from 'koa-cors';
import BodyParser from 'koa-body';
import serve from 'koa-static';
import Convert from 'koa-convert';
import routes from './routes';
import './config/mongoDatabase';
import Config from './config';
import templating from './templating';
import timeLogger from './middlewares/timeLogger';
import catchError from './middlewares/catchError';
import bodyFormatter from './utils/bodyFormatter';

const app = new Koa();
// 注入bodyFormatter方法到context
app.context.bodyFormatter = bodyFormatter;
// 中间件处理
app.use(Convert(Cors()));
app.use(BodyParser());
app.use(catchError());
app.use(timeLogger());
// 静态文件目录，设置后不用设置路由，也可以直接访问
app.use(serve(`${path.join(__dirname, '..', 'public')}`));
app.use(serve(`${path.join(__dirname, '..', 'dist')}`));
// 模板目录
app.use(templating('dist/', {
    noCache: Config.noCache,
    watch: Config.watch
}));
app.use(routes.routes(), routes.allowedMethods());

app.listen(4322);
