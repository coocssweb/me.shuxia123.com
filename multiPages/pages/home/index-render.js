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
    location: []
});
