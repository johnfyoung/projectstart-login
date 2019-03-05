import { SET_ISINSTALLED } from '../actions/types';

const initialState = {
    isInstalled: false,
    installation: {}
}

export default function (state = initialState, action) {
    console.log('reducers::install:: action', action);
    switch (action.type) {
        case SET_ISINSTALLED:
            return {
                isInstalled: action.payload.isInstalled,
                installation: action.payload.details || {}
            }
        default: {
            return state
        }
    }
}