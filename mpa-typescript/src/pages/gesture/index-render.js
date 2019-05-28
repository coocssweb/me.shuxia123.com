import layout from '@layout';
import content from './index.ejs';
const title = 'SVG让图形更多可能';
const keyword = 'SVG可编程的图形文件，一些常用SVG来做的效果';
const description = 'SVG';

export default layout.render({
    title,
    keyword,
    description,
    content,
    loading: false,
    location: []
});
