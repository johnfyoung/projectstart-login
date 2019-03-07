import axios from 'axios';
import { dbg } from '../utils/log';

import { SET_ISINSTALLED, GET_ERRORS } from './types';

export const setInstallation = (data) => {
    dbg("actions::setInstallation - data", data);
    return {
        type: SET_ISINSTALLED,
        payload: data
    }
};

export const checkForInstallation = () => dispatch => {
    if (localStorage.isInstalled && localStorage.isInstalled === "true") {
        dispatch(setInstallation({ isInstalled: true, value: 1 }));
    } else {
        axios.get('/api/install/isinstalled')
            .then(res => {
                dbg("actions::checkForInstallation - installed", res);
                localStorage.setItem('isInstalled', true);
                dispatch(setInstallation(res.data));
            }).catch(err => {
                dbg("actions::checkForInstallation - not installed", err.response.data);
                localStorage.setItem('isInstalled', false);
                dispatch(setInstallation(err.response.data));
            })
    }
}

export const install = (payload) => dispatch => {
    return axios.post('/api/install/install', payload)
        .then(res => {
            dbg("actions::install - installed", res);
            localStorage.setItem('isInstalled', true);
            dispatch(setInstallation({ isInstalled: true }));
        }).catch(err => {
            dbg("actions::install - not installed", err.response.data);
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            })
        })
};