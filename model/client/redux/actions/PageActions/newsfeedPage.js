import { NEWSFEED_PAGE_TYPING, 
        POSTING_CONTENT, 
        POSTING_SUCCESS, 
        POSTING_FAILURE, 
        POSTING_ABORTED, 
        CONTENT_TO_POST_EMPTY, 
        FETCHING_INITIAL_POSTS,
        INITIAL_POSTS_SUCCESS,
        INITIAL_POSTS_FAILURE,
        INITIAL_POSTS_ABORTED,
        FETCHING_RECENT_POSTS,
        RECENT_POSTS_SUCCESS,
        RECENT_POSTS_FAILURE,
        RECENT_POSTS_ABORTED,
        REVEAL_COLLECTED_POSTS} from '../../constants';
import { setAuthorizationToken } from '../../../utils/setAuthorizationToken';
import jwtDecode from 'jwt-decode';

export function onTyping(payload){
    return {
        type: NEWSFEED_PAGE_TYPING,
        payload
    }
}

export function onSubmitPost(payload){
    if(payload.content.text !== '' || payload.content.picUrl !== ''){
        return {
            type: POSTING_CONTENT,
            payload
        }
    }else{
       return {
            type: CONTENT_TO_POST_EMPTY
       } 
    }
    
}

export function postingSuccess(payload){
    return {
        type: POSTING_SUCCESS,
        payload: payload.data,
    }
}

export function postingFailure(error){
    return {
        type: POSTING_FAILURE,
        error,
    }
}

export function postingAborted(){
    return {
        type: POSTING_ABORTED,
    }
}

export function getInitialPosts(){
    return {
        type: FETCHING_INITIAL_POSTS,
    }
}

export function initialPostsSuccess(payload){
    return {
        type: INITIAL_POSTS_SUCCESS,
        payload
    }
}

export function initialPostsFailure(error){
    return {
        type: INITIAL_POSTS_FAILURE,
        error
    }
}

export function initialPostsAborted(){
    return {
        type: INITIAL_POSTS_ABORTED
    }
}

export function getRecentPosts(payload){
    return {
        type: FETCHING_RECENT_POSTS,
        payload
    }
}

export function recentPostsSuccess(payload){
    return {
        type: RECENT_POSTS_SUCCESS,
        payload
    }
}

export function recentPostsFailure(error){
    return {
        type: RECENT_POSTS_FAILURE,
        error
    }
}

export function recentPostsAborted(){
    return {
        type: RECENT_POSTS_ABORTED
    }
}

export function revealCollectedPosts(){
    return {
        type: REVEAL_COLLECTED_POSTS
    }
}