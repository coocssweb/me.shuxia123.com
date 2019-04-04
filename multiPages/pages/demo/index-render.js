import layout from 'layout';
import content from './index.ejs';
const title = '';
const keyword = '';
const description = '';

let data = {

};

export default layout.render({
    title,
    keyword,
    description,
    content,
    data,
    loading: true
});
