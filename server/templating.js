import 'module-alias/register';
import nunjucks from 'nunjucks';
import React from 'react';
import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router';
import { Provider } from 'react-redux';
import Layout from '../src/layout';
import createStore from '../src/redux/store/createStore';

function createEnv (path, opts) {
    let autoescape = opts.autoescape === undefined ? true : opts.autoescape;
    let noCache = opts.noCache || false;
    let watch = opts.watch || false;
    let throwOnUndefined = opts.throwOnUndefined || false;
    let env = new nunjucks.Environment(
        new nunjucks.FileSystemLoader(path, {
            noCache: noCache,
            watch: watch,
        }), {
            autoescape: autoescape,
            throwOnUndefined: throwOnUndefined
        });
    if (opts.filters) {
        for (let filter in opts.filters) {
            env.addFilter(filter, opts.filters[filter]);
        }
    }
    return env;
}

function template (path, opts) {
    let ENV = createEnv(path, opts);
    return async (ctx, next) => {
        ctx.render = function (view, model) {
            try {
                const store = createStore(model.data);

                const reactDomStr = renderToString(
                    <Provider store={ store }>
                        <StaticRouter location={ctx.request.url} context={model.data}>
                            <Layout />
                        </StaticRouter>
                    </Provider>
                );

                ctx.response.body = ENV.render(view, Object.assign(
                    { layout: reactDomStr },
                    model.seo || {},
                    { data: model.data || { home: {} } }
                ));
            } catch (err) {
                console.log(err);

                ctx.response.body = ENV.render(view, { meta: err });
            }
            ctx.response.type = 'text/html';
        };
        await next();
    };
}

export default template;
