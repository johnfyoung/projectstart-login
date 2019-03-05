import axios from 'axios';

import { SET_ISINSTALLED } from './types';

export const setInstallation = (data) => {
    console.log("actions::setInstallation - data", data);
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
                console.log("actions::checkForInstallation - installed", res);
                localStorage.setItem('isInstalled', true);
                dispatch(setInstallation(res.data));
            }).catch(err => {
                console.log("actions::checkForInstallation - not installed", err.response.data);
                localStorage.setItem('isInstalled', false);
                dispatch(setInstallation(err.response.data));
            })
    }
}