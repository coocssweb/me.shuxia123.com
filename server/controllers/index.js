import ArticleModel from '../dao/models/article';

const SITE_NAME = '王佳欣的小站';

let home = async function (ctx, next) {
    const { page = 1, size = 3 } = ctx.request.query;
    const result = await ArticleModel.fetch({ }, page, size);

    await ctx.render('index.html', {
        seo: {
            title: '王佳欣的小站',
            keyword: '王佳欣,前端开发工程师,全栈开发,javascript,nodejs,koa,react,redux',
            description: '我是王佳欣，2015年开始专职前端开发，喜欢前端技术，一直关注最新的前端新技术，目前比较擅长的技术站是javascript+react+redux+koa，keep learning。个人的优势是善于思考总觉，前端技术扎实，有服务端架构模式思维，性格比较细腻，善于做前端性能、体验优化。个人的劣势是，南方人有一点点口音，英语口语不好(书面可以，可无障碍阅读)，非算法科班因此算法比较肉(常用算法除外)，没有大团队的管理经验(只做过小团队管理)。'
        },
        data: {
            home: {
                recommends: result,
                server: true
            }
        }
    });
    await next();
};

let ideas = async function (ctx, next) {
    const { page = 1, size = 10 } = ctx.request.query;
    const result = await ArticleModel.fetch({ }, page, size);

    await ctx.render('index.html', {
        seo: {
            title: `想法_分享关于前端的一些想法 - ${SITE_NAME}`,
            keyword: '王佳欣的想法,王佳欣的idea,王佳欣的分享',
            description: '想法栏目，王佳欣会分享关于前端方面的一些想法。'
        },
        data: {
            ideas: {
                list: result,
                server: true
            }
        }
    });
    await next();
};

let detail = async function (ctx, next) {
    const { id } = ctx.params;
    const result = await ArticleModel.findById(id);

    await ctx.render('index.html', {
        seo: {
            title: `${result.title} - ${SITE_NAME}`,
            keyword: '',
            description: result.description
        },
        data: {
            detail: {
                data: result,
                server: true
            }
        }
    });
    await next();
};

module.exports = {
    home,
    ideas,
    detail
};
