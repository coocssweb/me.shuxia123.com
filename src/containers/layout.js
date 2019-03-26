import { connect } from 'react-redux';
import Layout from '../layout';

function mapStateToProps (state) {
    let ideas = state['ideas'];
    return {
        classify: ideas.currentPath
    };
}

function mapDispatchToProps (dispatch) {
    return {

    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Layout);
