import { SEARCHING_SUCCESS, SEARCHING_FAILURE, ON_FOLLOW_PRESSED } from '../constants';

export function searchingSuccess(payload){
    return {
        type: SEARCHING_SUCCESS,
        payload,
    }
}

export function searchingFailure(error){
    return {
        type: SEARCHING_FAILURE,
        error,
    }
}

