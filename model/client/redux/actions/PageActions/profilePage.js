import { FETCHING_PROFILE, FETCHING_PROFILE_SUCCESS, FETCHING_PROFILE_FAILURE, FETCHING_PROFILE_ABORTED } from '../../constants';

export function fetchProfile(payload){
    return {
        type: FETCHING_PROFILE,
        payload,
    }
}

export function fetchingProfileSuccess(payload){
    return {
        type: FETCHING_PROFILE_SUCCESS,
        payload,
    }
}

export function fetchingProfileFailure(error){
    return {
        type: FETCHING_PROFILE_FAILURE,
        error
    }
}

export function fetchingProfileAborted(){
    return {
        type: FETCHING_PROFILE_ABORTED,
    }
}