import { ON_COMMENT_FOCUSED, ON_TYPING_COMMENT, 
        SUBMITTING_COMMENT, SUBMITTING_COMMENT_SUCCESS, 
          SUBMITTING_COMMENT_FAILURE, SUBMITTING_COMMENT_ABORTED,
        FETCHING_COMMENTS_SUCCESS, FETCHING_COMMENTS_FAILURE,
        FETCHING_COMMENTS_ABORTED,
        PROCESSING_LIKE, PROCESSING_LIKE_SUCCESS,
        PROCESSING_LIKE_FAILURE, PROCESSING_LIKE_ABORTED} from '../constants';

export function onCommentFocused(payload){
    let pureId = payload;
    if(payload.substring(0,4) === 'true'){
        pureId = payload.substring(5); 
    }
    return {
        type: ON_COMMENT_FOCUSED,
        payload,
        pureId
    }
}

export function onTypingComment(payload){
    return {
        type: ON_TYPING_COMMENT,
        payload
    }
}

export function onSubmitComment(payload){
    return {
        type: SUBMITTING_COMMENT,
        payload
    }
}

export function submittingCommentSuccess(payload){
    return {
        type: SUBMITTING_COMMENT_SUCCESS,
        payload
    }
}

export function submittingCommentFailure(error){
    return {
        type: SUBMITTING_COMMENT_FAILURE,
        error
    }
}

export function submittingCommentAborted(){
    return {
        type: SUBMITTING_COMMENT_ABORTED,
    }
}

export function fetchingCommentsSuccess(payload){
    return {
        type: FETCHING_COMMENTS_SUCCESS,
        payload,
    }
}

export function fetchingCommentsFailure(error){
    return {
        type: FETCHING_COMMENTS_FAILURE,
        error,
    }
}

export function fetchingCommentsAborted(){
    return {
        type: FETCHING_COMMENTS_ABORTED,
    }
}

export function onLikePressed(payload){
    return {
        type: PROCESSING_LIKE,
        payload
    }
}

export function processingLikeSuccess(payload){
    return {
        type: PROCESSING_LIKE_SUCCESS,
        payload,
    }
}

export function processingLikeFailure(error){
    return {
        type: PROCESSING_LIKE_FAILURE,
        error
    }
}

export function processingLikeAborted(){
    return {
        type: PROCESSING_LIKE_ABORTED,
    }
}