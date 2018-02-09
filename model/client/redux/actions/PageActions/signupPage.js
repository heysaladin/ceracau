import { SIGNUP_PAGE_TYPING, REGISTERING_USER, REGISTRATION_SUCCESS, REGISTRATION_FAILURE, REGISTRATION_ABORTED } from '../../constants';
import { push } from 'react-router-redux';

export function onTyping(payload){
    return {
        type: SIGNUP_PAGE_TYPING,
        payload
    }
}

export function onSignupPressed(payload){
    return {
        type: REGISTERING_USER,
        payload
    }
}

export function signupSuccess(){
    return {
        type: REGISTRATION_SUCCESS
    }
}

export function signupFailure(error){
    return {
        type: REGISTRATION_FAILURE,
        error,
    }
}

export function signupAborted(payload){
    return {
        type: REGISTRATION_ABORTED,
    }
}

export function navigateTo(url){
    return push(url);
}