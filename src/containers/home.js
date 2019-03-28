import { connect } from 'react-redux';
import Home from '../pages/home';
import * as actions from '../redux/actions';

function mapStateToProps (state) {
    let data = state['home'];

    return {
        ...data
    };
}

function mapDispatchToProps (dispatch) {
    return {
        fetchRecommendIdeas: (callback) => dispatch(actions.fetchRecommendIdeas(callback)),
        fetchRecommendProjects: (callback) => dispatch(actions.fetchRecommendProjects(callback)),
        fetchRecommendDemos: (callback) => dispatch(actions.fetchRecommendDemos(callback))
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);
