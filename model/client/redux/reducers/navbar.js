import { ON_TYPING_SEARCH } from '../constants';

const initialNavbarState = {
    searchInput: ''
}

export default function navbar(state=initialNavbarState, action){
    switch(action.type){
        case ON_TYPING_SEARCH:
            return {
                searchInput: action.payload.value
            }
        default: return state;
    }
}