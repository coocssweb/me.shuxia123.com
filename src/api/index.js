/**
 * Created by coocss on 2019/2/26.
 */
import Base from './base';

class Index extends Base {
    fetchHome () {
        return this.request({ path: 'api/home' });
    }
    fetchIdeas (page) {
        return this.request({ path: `api/ideas`, data: { page } });
    }
    fetchDetail (id) {
        return this.request({ path: `api/detail`, data: { id } });
    }
}

export default new Index();
