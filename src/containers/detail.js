import { connect } from 'react-redux';
import Detail from '../pages/detail';
import * as actions from '../redux/actions';

function mapStateToProps (state) {
    let data = state['detail'];
    return {
        ...data,
        serverRender: state['serverRender']
    };
}

function mapDispatchToProps (dispatch) {
    return {
        fetchDetail: (id, callback) => dispatch(actions.fetchDetail(id, callback)),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Detail);
