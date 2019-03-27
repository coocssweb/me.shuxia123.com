import Base from './base';

class Index extends Base {
    fetchRecommendIdeas () {
        return this.request({ path: 'recommend/ideas', needDelay: true });
    }
    fetchRecommendProjects () {
        return this.request({ path: 'recommend/projects', needDelay: true });
    }
    fetchRecommendDemos () {
        return this.request({ path: 'recommend/demos', needDelay: true });
    }
    fetchClassifies () {
        return this.request({ path: 'classifies', needDelay: true });
    }
    fetchIdeas ({ classify, page }) {
        return this.request({ path: `ideas/${classify}`, data: { page }, needDelay: true });
    }
    fetchProjects (page) {
        return this.request({ path: 'projects', needDelay: true });
    }
    fetchDetail (id) {
        return this.request({ path: `detail/${id}`, needDelay: true });
    }
}

export default new Index();
