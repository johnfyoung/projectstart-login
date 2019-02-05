import { applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import logger from './logger';

export default compose(
    applyMiddleware(
        thunk,
        logger
    ),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);