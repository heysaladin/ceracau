import { ON_COMMENT_FOCUSED, ON_TYPING_COMMENT, SUBMITTING_COMMENT, 
    SUBMITTING_COMMENT_SUCCESS, SUBMITTING_COMMENT_FAILURE,
    FETCHING_COMMENTS_SUCCESS, PROCESSING_LIKE_SUCCESS } from '../constants';

const initialEachPostState = {
    commentFocused: null,
    commentInput: '',
    comments: null,
    isLiked: false,
}

export default function eachPost(state=initialEachPostState, action){
    switch(action.type){
        case ON_COMMENT_FOCUSED:
            if(action.payload.substring(0, 4) === 'true'){
                if(state.commentFocused === action.payload.substring(5)){
                    return {
                        ...state,
                        commentFocused: null,
                        commentInput: '',
                        isLiked: true,
                    }
                }else{
                    return {
                        ...state,
                        commentFocused: action.payload.substring(5),
                        commentInput: '',
                        isLiked: true,
                    }
                }
            }else{
                if(state.commentFocused === action.payload){
                    return {
                        ...state,
                        commentFocused: null,
                        commentInput: '',
                        isLiked: false,
                    }
                }else{
                    return {
                        ...state,
                        commentFocused: action.payload,
                        commentInput: '',
                        isLiked: false,
                    }
                }
            }
                
            
        case ON_TYPING_COMMENT:
            return {
                ...state,
                commentInput: action.payload
            }

        case SUBMITTING_COMMENT:
            return {
                ...state,
                isSubmittingComment: true,
            }    

        case SUBMITTING_COMMENT_SUCCESS:
            return {
                ...state,
                comments: action.payload.postCommented.comments,
                isSubmittingComment: false,
                commentInput: '',
            }

        case SUBMITTING_COMMENT_FAILURE:
            return {
                ...state,
                isSubmittingComment: false,
            }
        case FETCHING_COMMENTS_SUCCESS:
            return {
                ...state,
                comments: action.payload.comments,
            }
        case PROCESSING_LIKE_SUCCESS:
            if(state.commentFocused === action.payload.updatedPost._id.toString()){
                return {
                    ...state,
                    isLiked: action.payload.updatedPost.isLikedByCurrentUser,
                }
            }else{
                return state;
            }

        default: return state;
    }
}