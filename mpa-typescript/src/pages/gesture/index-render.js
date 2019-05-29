import layout from '@layout';
import content from './index.ejs';
const title = 'touchjs手势演示';
const keyword = 'touchjs手势演示，应用好手势，让你的应用更加有趣生动';
const description = 'SVG';

export default layout.render({
    title,
    keyword,
    description,
    content,
    loading: false,
    location: []
});
