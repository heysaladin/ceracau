import { SEARCHING, SEARCHING_SUCCESS, PROCESSING_FOLLOW_SUCCESS } from '../../constants';

const initialSearchPageState = {
    searchResult: null,
    isSearching: false,
}

export default function searchPage(state=initialSearchPageState, action){
    switch(action.type){
        case SEARCHING:
            return {
                ...state,
                isSearching: true
            }
        
        case SEARCHING_SUCCESS:
            return {
                ...state,
                isSearching: false,
                searchResult: action.payload.searchResult,
            }
        case PROCESSING_FOLLOW_SUCCESS:
            if(action.payload.user._id.toString() === state.searchResult._id.toString()){
                return {
                    searchResult: action.payload.user
                }
            }else{
                return state;
            }
            

        default: return state;
    }
}