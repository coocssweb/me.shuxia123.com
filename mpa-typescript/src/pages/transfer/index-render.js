import layout from '@layout';
import content from './index.ejs';
const title = '大图片上传';
const keyword = '';
const description = 'javascript大图上传，断点续传';

export default layout.render({
    title,
    keyword,
    description,
    content,
    loading: false,
    location: []
});
