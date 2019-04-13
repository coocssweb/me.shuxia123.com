import layout from 'layout';
import content from './index.ejs';
const title = '';
const keyword = '';
const description = '';

export default layout.render({
    title,
    keyword,
    description,
    content,
    loading: true,
    location: [
        {
            name: '首页',
            url: '/'
        }, {
            name: '杂志栏目',
            url: '/magazines'
        }, {
            name: '杂志栏目',
        }
    ]
});
