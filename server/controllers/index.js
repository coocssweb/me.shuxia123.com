import ArticleModel from '../dao/models/article';
import ProjectModel from '../dao/models/project';
import TagModel from '../dao/models/tag';
import DemoModel from '../dao/models/demo';
import contentFormatter from '../utils/articleContentFormatter';
import previewImageFormatter from '../utils/previewImageFormatter';

const SITE_NAME = '王佳欣的小站';

let home = async function (ctx, next) {
    const ideas = await ArticleModel.fetch({ }, 1, 3);
    const projects = await ProjectModel.fetch({ }, 1, 4);
    const demos = await DemoModel.fetch({ }, 1, 5);

    await ctx.render('index.html', {
        seo: {
            title: '王佳欣的小站',
            keyword: '王佳欣,前端开发工程师,全栈开发,javascript,nodejs,koa,react,redux',
            description: '我是王佳欣，2015年开始专职前端开发，喜欢前端技术，一直关注最新的前端新技术，目前比较擅长的技术站是javascript+react+redux+koa，keep learning。个人的优势是善于思考总觉，前端技术扎实，有服务端架构模式思维，性格比较细腻，善于做前端性能、体验优化。个人的劣势是，南方人有一点点口音，英语口语不好(书面可以，可无障碍阅读)，非算法科班因此算法比较肉(常用算法除外)，没有大团队的管理经验(只做过小团队管理)。'
        },
        data: {
            home: {
                ideas,
                projects,
                demos,
                server: true
            }
        }
    });
    await next();
};

let projects = async function (ctx, next) {
    const { page = 1, size = 10 } = ctx.request.query;
    const result = await ProjectModel.fetch({ }, page, size);

    await ctx.render('index.html', {
        seo: {
            title: `开源项目_分享我的一些开源项目 - ${SITE_NAME}`,
            keyword: '王佳欣的开源项目,王佳欣的代码,王佳欣的项目',
            description: '开源项目，王佳欣会分享一些做好的开源项目。'
        },
        data: {
            projects: {
                list: result,
                server: true
            }
        }
    });
    await next();
};

let demos = async function (ctx, next) {
    const { page = 1, size = 10 } = ctx.request.query;
    const result = await DemoModel.fetch({}, page, size);
    await ctx.render('index.html', {
        seo: {
            title: `实验室_分享小实验demo - ${SITE_NAME}`,
            keyword: '王佳欣的小实验,王佳欣的demo,王佳欣的探索',
            description: '分享我的一些实验demo，去探索，即使从零开始，开始了就成功了90%。'
        },
        data: {
            demos: {
                list: result,
                server: true
            }
        }
    });
    await next();
};

let ideas = async function (ctx, next) {
    const { page = 1, size = 10 } = ctx.request.query;
    const { classify = '' } = ctx.params;
    const query = {};
    if (classify) {
        query.classify = classify;
    }
    const result = await ArticleModel.fetch(query, page, size);
    const classifies = await TagModel.fetch();
    const total = classifies.reduce((prev, current) => {
        return prev + current.total;
    }, 0);
    await ctx.render('index.html', {
        seo: {
            title: `想法_分享关于前端的一些想法 - ${SITE_NAME}`,
            keyword: '王佳欣的想法,王佳欣的idea,王佳欣的分享',
            description: '想法栏目，王佳欣会分享关于前端方面的一些想法。'
        },
        data: {
            ideas: {
                list: result,
                classifies: [{ id: 0, name: '所有', path: '', total }, ...classifies],
                server: true
            }
        }
    });
    await next();
};

let detail = async function (ctx, next) {
    const { id } = ctx.params;
    const result = await ArticleModel.findById(id);
    result.content = contentFormatter(result.content);
    result.posters.forEach((item, index) => {
        result.posters[index] = previewImageFormatter(result.posters[index]);
    });
    await ctx.render('index.html', {
        seo: {
            title: `${result.title} - ${SITE_NAME}`,
            keyword: '',
            description: result.description
        },
        data: {
            detail: {
                article: result,
                server: true
            }
        }
    });
    await next();
};

module.exports = {
    home,
    ideas,
    projects,
    demos,
    detail
};
