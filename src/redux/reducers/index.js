import { combineReducers } from 'redux';
import home from './home';
import ideas from './ideas';
import projects from './projects';
import detail from './detail';

export default combineReducers({
    home,
    ideas,
    detail,
    projects
});
