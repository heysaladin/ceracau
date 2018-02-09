import { SET_CURRENT_USER } from '../constants';

export function setCurrentUser(payload){
    return {
        type: SET_CURRENT_USER,
        payload
    }
}