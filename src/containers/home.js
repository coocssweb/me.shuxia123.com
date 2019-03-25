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
        fetchHome: (callback) => dispatch(actions.fetchHome(callback))
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);
