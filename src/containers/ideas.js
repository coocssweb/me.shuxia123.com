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
        fetchIdeas: (page) => dispatch(actions.fetchIdeas(page))
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Ideas);
