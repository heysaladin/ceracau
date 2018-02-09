import { ON_TYPING_SEARCH, SEARCHING } from '../constants';
import { push } from 'react-router-redux';

export function onTyping(payload){
    return {
        type: ON_TYPING_SEARCH,
        payload
    }
}

export function onSubmitSearch(payload){
    return {
        type: SEARCHING,
        payload
    }
}