import React from 'react';
import ReactDOM from 'react-dom';

import jwt_decode from 'jwt-decode';
import { createStore } from 'redux';
import { Provider } from 'react-redux';

import rootReducer from './reducers';
import middleware from './middleware';

import setAuthToken from './utils/setAuthToken';
import { setCurrentUser, logoutUser } from './actions/auth';
import { checkForInstallation } from './actions/install';

import App from './components/App';
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.scss';

const initialState = {};
const store = createStore(rootReducer, initialState, middleware);

if (localStorage.jwtToken) {
    // Set auth token header auth
    setAuthToken(localStorage.jwtToken);

    // decode the token
    const decoded = jwt_decode(localStorage.jwtToken);

    // set user and isAuthenticated
    store.dispatch(setCurrentUser(decoded));

    // check for expired token
    const currentTime = Date.now() / 1000;

    if (decoded.exp < currentTime) {
        store.dispatch(logoutUser());
        // TODO: clear profile

        // redirect to login
        window.location.href = '/login';
    }
}

store.dispatch(checkForInstallation());

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>
    ,
    document.getElementById('root')
);