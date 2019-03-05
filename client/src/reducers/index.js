import { combineReducers } from 'redux';

import auth from './auth';
import errors from './errors';
import install from './install';

export default combineReducers({
    auth,
    install,
    errors
});