/**
 * Created by zj-db0666 on 2018/6/5.
 */
import layout from 'layout';
import content from './index.ejs';
const title = '服务协议';
const keyword = '';
const description = '';

let data = {

};

// 菜单配置
export default layout.render({title,
    keyword,
    description,
    content,
    data,
    gLoading: true
});
