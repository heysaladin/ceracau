import { AUTHENTICATION_SUCCESS, SET_CURRENT_USER } from '../constants';

const initialAuthState = {
    user: {},
    loggedIn: false,
};

export default function auth (state=initialAuthState, action) {
    switch(action.type){
        case AUTHENTICATION_SUCCESS:
            return {
                user: action.payload
            }
        case SET_CURRENT_USER:
            return {
                user: action.payload,
                loggedIn: true,
            }
        default: return state;
     }
 }

    