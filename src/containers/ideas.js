import { connect } from 'react-redux';
import Ideas from '../pages/ideas';
import * as actions from '../redux/actions';

function mapStateToProps (state) {
    let ideas = state['ideas'];
    return {
        ...ideas
    };
}

function mapDispatchToProps (dispatch) {
    return {
        fetchIdeas: (page, callback) => dispatch(actions.fetchIdeas(page, callback))
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Ideas);
