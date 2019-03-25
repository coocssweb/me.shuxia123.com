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
        fetchDetail: (id) => dispatch(actions.fetchDetail(id)),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Detail);
