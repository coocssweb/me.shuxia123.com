import { connect } from 'react-redux';
import Projects from '../pages/projects';
import * as actions from '../redux/actions';

function mapStateToProps (state) {
    let projects = state['projects'];
    return {
        ...projects
    };
}

function mapDispatchToProps (dispatch) {
    return {
        fetchProjects: (page, callback) => dispatch(actions.fetchProjects(page, callback))
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Projects);
