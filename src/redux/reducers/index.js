import { combineReducers } from 'redux';
import home from './home';
import ideas from './ideas';
import detail from './detail';

export default combineReducers({
    home,
    ideas,
    detail
});
