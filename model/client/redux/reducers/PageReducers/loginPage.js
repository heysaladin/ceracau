import { LOGIN_PAGE_TYPING } from '../../constants';

const initialLoginPageState = {
    inputText: {
        identifier: '',
        password: '',
    }
}

export default function loginPage(state=initialLoginPageState, action){
    switch(action.type){  
        case LOGIN_PAGE_TYPING:
            if(action.payload.name === 'identifier'){
                return {
                    ...state,
                    inputText: {
                        ...state.inputText,
                        identifier: action.payload.value
                    }
                };
            }else if(action.payload.name === 'password'){
                return {
                    ...state,
                    inputText: {
                        ...state.inputText,
                        password: action.payload.value
                    }
                };
            }
            
        default: return state;
    }
}