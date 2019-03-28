import { connect } from 'react-redux';
import Demos from '../pages/demos';
import * as actions from '../redux/actions';

function mapStateToProps (state) {
    let demos = state['demos'];
    return {
        ...demos
    };
}

function mapDispatchToProps (dispatch) {
    return {
        fetchDemos: (callback) => dispatch(actions.fetchDemos(callback))
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Demos);
