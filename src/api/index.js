import Base from './base';

class Index extends Base {
    fetchHome () {
        return this.request({ path: 'recommends', needDelay: true});
    }
    fetchIdeas (page) {
        return this.request({ path: `ideas`, data: { page }, needDelay: true });
    }
    fetchDetail (id) {
        return this.request({ path: `detail/${id}`, needDelay: true });
    }
}

export default new Index();
