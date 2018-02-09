import { FETCHING_PROFILE_SUCCESS } from '../../constants';

const initialProfilePageState = {
    profileData: null,
}

export default function profilePage(state=initialProfilePageState, action){
    switch(action.type){
        case FETCHING_PROFILE_SUCCESS:
            return {
                profileData: action.payload.profileData,
            }
        default: return state;
    }
}