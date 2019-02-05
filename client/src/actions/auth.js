import axios from 'axios';
import setAuthToken from '../utils/setAuthToken';
import jwt_decode from 'jwt-decode';

import { GET_ERRORS, SET_CURRENT_USER } from './types';

// Register User
export const registerUser = (userData, history) => dispatch => {
    axios.post('/api/auth/register', userData)
        .then(res => history.push('/login'))
        .catch(err =>
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            })
        );
};

// Login - Get User Token
export const loginUser = (userData) => dispatch => {
    axios.post('/api/auth/login', userData)
        .then(res => {
            // Save to localstorage
            const { token } = res.data;
            localStorage.setItem('jwtToken', token);
            setAuthToken(token);
            // Decode token to get user data
            const decoded = jwt_decode(token);

            dispatch(setCurrentUser(decoded));
        })
        .catch(err =>
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            })
        );
}

export const setCurrentUser = (decoded) => {
    return {
        type: SET_CURRENT_USER,
        payload: decoded
    }
}

// log user out
export const logoutUser = (history) => dispatch => {
    // remove from localStorage
    localStorage.removeItem('jwtToken');

    // remove auth header
    setAuthToken(false);

    // unset isAuthenticated, remove user
    dispatch(setCurrentUser({}));

    history.push('/login');
}