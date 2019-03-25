import { createStore, applyMiddleware } from 'redux';
import promiseMiddleware from '../middlewares/promiseMiddleware';
import callbackMiddleware from '../middlewares/callbackMiddleware';

import rootReducer from '../reducers';

export default (data) => {
    let finalCreateStore = applyMiddleware(promiseMiddleware, callbackMiddleware)(createStore);
    return finalCreateStore(rootReducer, data);
};
