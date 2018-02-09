import { LOGIN_PAGE_TYPING, AUTHENTICATING_USER, AUTHENTICATION_SUCCESS, AUTHENTICATION_FAILURE, AUTHENTICATION_ABORTED } from '../../constants';
import { setAuthorizationToken } from '../../../utils/setAuthorizationToken';
import jwtDecode from 'jwt-decode';

export function onTyping(payload){
    return {
        type: LOGIN_PAGE_TYPING,
        payload
    }
}

export function onLoginPressed(payload){
    return {
        type: AUTHENTICATING_USER,
        payload
    }
}

export function loginSuccess(payload){
    return {
        type: AUTHENTICATION_SUCCESS,
        payload: payload.data,
    }
}

export function setToken(payload){
     const {data, token} = payload.data;
     localStorage.setItem('jwtToken', token);
     localStorage.setItem('user', JSON.stringify(data));
     setAuthorizationToken(token);
     return {
         type: 'SET_TOKEN',
     }
}

export function loginFailure(error){
    return {
        type: AUTHENTICATION_FAILURE,
        error,
    }
}

export function loginAborted(payload){
    return {
        type: AUTHENTICATION_ABORTED,
    }
}