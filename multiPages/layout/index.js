/**
 * Layout
 * Created by 王佳欣 on 2018/6/4.
 */
import layoutEjs from './layout.ejs';
import headerEjs from './header.ejs';
import footerEjs from './footer.ejs';

// 渲染页面
export default {
    render: ({title, keyword, description, content, data, location, page = '', pure = false}) => {
        const renderData = {
            title,
            keyword,
            description,
            header: headerEjs({STATIC_PATH: process.env.STATIC_PATH}),
            footer: footerEjs({STATIC_PATH: process.env.STATIC_PATH}),
            content: typeof content === 'string' ? content : content(data),
            console: process.env.NODE_ENV !== 'production',
            STATIC_PATH: process.env.STATIC_PATH,
            node_env: process.env.NODE_ENV,
            page,
            location
        };
        return layoutEjs(renderData);
    }
};
