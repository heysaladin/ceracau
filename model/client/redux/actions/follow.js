import { PROCESSING_FOLLOW, PROCESSING_FOLLOW_SUCCESS, PROCESSING_FOLLOW_FAILURE, PROCESSING_FOLLOW_ABORTED } from '../constants';

export function onFollowPressed(payload){
    return {
        type: PROCESSING_FOLLOW,
        payload,
    }
}

export function processingFollowSuccess(payload){
    return {
        type: PROCESSING_FOLLOW_SUCCESS,
        payload
    }
}

export function processingFollowFailure(error){
    return {
        type: PROCESSING_FOLLOW_FAILURE,
        error
    }
}

export function processingFollowAborted(){
    return {
        type: PROCESSING_FOLLOW_ABORTED,
    }
}